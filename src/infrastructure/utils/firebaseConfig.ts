// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import firebaseJson from '~/../firebase.json'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'apiKet',
  authDomain: 'authDomain',
  projectId: 'projectId',
  storageBucket: 'storageBucket',
  messagingSenderId: 'messagingSenderId',
  appId: 'appId',
  databaseURL: 'databaseURL',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = isSupported().then((yes) =>
  yes && process.env.NODE_ENV === 'production' ? getAnalytics(app) : null
)

// Firebase Auth Emulator
if (process.env.NODE_ENV === 'development')
  connectAuthEmulator(
    getAuth(app),
    `http://localhost:${firebaseJson.emulators.auth.port}`
  )

if (process.env.NODE_ENV === 'development')
  connectFirestoreEmulator(
    getFirestore(app),
    'localhost',
    firebaseJson.emulators.firestore.port
  )
