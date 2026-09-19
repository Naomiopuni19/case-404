import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCoA-TfCD5PHh9pVIPp7hpgCER0gurpQpI",
  authDomain: "case-404.firebaseapp.com",
  projectId: "case-404",
  storageBucket: "case-404.firebasestorage.app",
  messagingSenderId: "145578269359",
  appId: "1:145578269359:web:1a13f1ba42a4f1b8be525a",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)