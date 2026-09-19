import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { doc, getDoc, setDoc, updateDoc, arrayUnion, increment } from "firebase/firestore"
import { auth, db } from "../lib/firebase"

const STARTING_BALANCE = 0
const STARTING_ROLE = "Junior Analyst"
const PAY_PER_CASE = 500

const RANKS = [
  { minCases: 0, role: "Junior Analyst" },
  { minCases: 1, role: "Analyst" },
  { minCases: 2, role: "Senior Analyst" },
]

function rankForCaseCount(count) {
  let role = RANKS[0].role
  for (const r of RANKS) {
    if (count >= r.minCases) role = r.role
  }
  return role
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        const ref = doc(db, "profiles", firebaseUser.uid)
        const snap = await getDoc(ref)
        setProfile(snap.exists() ? snap.data() : null)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  async function signUp(email, password) {
    setError("")
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    const ref = doc(db, "profiles", cred.user.uid)
    const initialProfile = {
      email,
      role: STARTING_ROLE,
      balance: STARTING_BALANCE,
      casesSolved: [],
      caseScores: {},
      hired: false,
      createdAt: Date.now(),
    }
    await setDoc(ref, initialProfile)
    setProfile(initialProfile)
  }

  async function logIn(email, password) {
    setError("")
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function logOut() {
    await signOut(auth)
  }

  async function passQuiz() {
    if (!user) return
    const ref = doc(db, "profiles", user.uid)
    await updateDoc(ref, { hired: true })
    setProfile((prev) => (prev ? { ...prev, hired: true } : prev))
  }

  async function recordCaseSolved(caseId, overallScore) {
    if (!user) return
    if (profile && profile.casesSolved && profile.casesSolved.includes(caseId)) return

    const ref = doc(db, "profiles", user.uid)
    const pay = PAY_PER_CASE + Math.round(overallScore * 5)
    const previousCases = profile?.casesSolved || []
    const newCases = [...previousCases, caseId]
    const previousRole = profile?.role || STARTING_ROLE
    const newRole = rankForCaseCount(newCases.length)
    const promoted = newRole !== previousRole
    const previousScores = profile?.caseScores || {}
    const newScores = { ...previousScores, [caseId]: overallScore }

    const updates = {
      casesSolved: arrayUnion(caseId),
      balance: increment(pay),
      caseScores: newScores,
    }
    if (promoted) updates.role = newRole

    await updateDoc(ref, updates)

    setProfile((prev) =>
      prev
        ? {
            ...prev,
            casesSolved: newCases,
            balance: prev.balance + pay,
            role: promoted ? newRole : prev.role,
            caseScores: newScores,
          }
        : prev
    )

    return { pay, promoted, newRole }
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, error, setError, signUp, logIn, logOut, passQuiz, recordCaseSolved }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}