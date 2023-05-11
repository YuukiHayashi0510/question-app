// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { Env } from '~/types/utils'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  databaseURL: '',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = isSupported().then((yes) =>
  yes && process.env.NODE_ENV === Env.Production ? getAnalytics(app) : null
)
