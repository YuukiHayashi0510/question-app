import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import firebaseJson from '~/../firebase.json'
import { Env } from '~/types/utils'
import { app } from '../config'

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
if (process.env.NODE_ENV === Env.Development)
  connectFirestoreEmulator(
    db,
    'localhost',
    firebaseJson.emulators.firestore.port
  )
