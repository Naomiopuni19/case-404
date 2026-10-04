import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { doc, getDoc, setDoc, updateDoc, arrayUnion, increment } from "firebase/firestore"
import { auth, db } from "../lib/firebase"

const AuthContext = createContext(null)

const RANKS = [
  { minCases: 0, role: "Junior Analyst" },
  { minCases: 1, role: "Analyst" },
  { minCases: 2, role: "Senior Analyst" },
]

function rankForCaseCount(count) {
  let role = RANKS[0].role
  for (const tier of RANKS) {
    if (count >= tier.minCases) role = tier.role
  }
  return role
}

const PAY_PER_CASE = 500

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        const ref = doc(db, "profiles", firebaseUser.uid)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setProfile(snap.data())
        }
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  async function signUp(email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    const initialProfile = {
      email,
      role: "Junior Analyst",
      balance: 0,
      casesSolved: [],
      caseScores: {},
      applicationStatus: "pending",
      candidateProfile: null,
      hired: false,
      createdAt: Date.now(),
    }
    await setDoc(doc(db, "profiles", cred.user.uid), initialProfile)
    setProfile(initialProfile)
  }

  async function logIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function logOut() {
    await signOut(auth)
  }

  async function submitQuizResult(passed) {
    if (!user) return
    const ref = doc(db, "profiles", user.uid)
    const applicationStatus = passed ? "accepted" : "rejected"
    await updateDoc(ref, { applicationStatus })
    setProfile((prev) => ({ ...prev, applicationStatus }))
  }

  async function resetApplication() {
    if (!user) return
    const ref = doc(db, "profiles", user.uid)
    await updateDoc(ref, { applicationStatus: "pending" })
    setProfile((prev) => ({ ...prev, applicationStatus: "pending" }))
  }

  async function saveCandidateProfile(data) {
    if (!user) return
    const ref = doc(db, "profiles", user.uid)
    await updateDoc(ref, { candidateProfile: data, hired: true })
    setProfile((prev) => ({ ...prev, candidateProfile: data, hired: true }))
  }

  async function recordCaseSolved(caseId, overallScore) {
    if (!user || !profile) return { pay: 0, promoted: false, newRole: profile?.role }
    if (profile.casesSolved.includes(caseId)) {
      return { pay: 0, promoted: false, newRole: profile.role, alreadyLogged: true }
    }

    const pay = PAY_PER_CASE + Math.round(overallScore * 5)
    const newCasesSolved = [...profile.casesSolved, caseId]
    const newRole = rankForCaseCount(newCasesSolved.length)
    const promoted = newRole !== profile.role

    const ref = doc(db, "profiles", user.uid)
    await updateDoc(ref, {
      casesSolved: arrayUnion(caseId),
      balance: increment(pay),
      [`caseScores.${caseId}`]: overallScore,
      role: newRole,
    })

    setProfile((prev) => ({
      ...prev,
      casesSolved: newCasesSolved,
      balance: prev.balance + pay,
      caseScores: { ...prev.caseScores, [caseId]: overallScore },
      role: newRole,
    }))

    return { pay, promoted, newRole }
  }

  const value = {
    user,
    profile,
    loading,
    error,
    setError,
    signUp,
    logIn,
    logOut,
    submitQuizResult,
    resetApplication,
    saveCandidateProfile,
    recordCaseSolved,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}