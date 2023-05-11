import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { UserResponse } from '~/types/user'
import { auth } from '../setup'

export async function authSignUp(
  email: string,
  password: string
): Promise<UserResponse> {
  let response: UserResponse['response'] = undefined
  let isError: UserResponse['isError'] = false
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      response = userCredential.user
    })
    .catch((error: ErrorEvent) => {
      response = error.message
      console.error(response)
      isError = true
    })
  return { isError, response }
}

export async function authSignIn(
  email: string,
  password: string
): Promise<UserResponse> {
  let response: UserResponse['response'] = undefined
  let isError: UserResponse['isError'] = false
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      response = userCredential.user
    })
    .catch((error) => {
      response = error
      isError = true
    })
  return { isError, response }
}

export async function authSignOut(): Promise<UserResponse> {
  let response: UserResponse['response'] = undefined
  let isError: UserResponse['isError'] = false
  await signOut(auth)
    .then((data) => {
      response = data
    })
    .catch((err: ErrorEvent) => {
      response = err.message
      console.error(response)
      isError = true
    })

  return { isError, response }
}
