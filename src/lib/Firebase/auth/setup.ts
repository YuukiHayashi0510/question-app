import { getAuth, connectAuthEmulator } from 'firebase/auth'
import firebaseJson from '~/../firebase.json'
import { Env } from '~/types/utils'
import { app } from '../config'

export const auth = getAuth(app)
if (process.env.NODE_ENV === Env.Development)
  connectAuthEmulator(
    auth,
    `http://localhost:${firebaseJson.emulators.auth.port}`
  )
