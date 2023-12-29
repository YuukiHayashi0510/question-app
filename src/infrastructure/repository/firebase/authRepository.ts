import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as authSignOut,
  getAuth,
} from 'firebase/auth'
import { UserResponse } from '~/types/pages/user'
import { app } from '../../utils/firebaseConfig'

export abstract class AuthRepository {
  static get auth() {
    return getAuth(app)
  }

  static async signUp(email: string, password: string): Promise<UserResponse> {
    const userResponse: UserResponse = {
      response: undefined,
      isError: false,
    }

    await createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        userResponse.response = userCredential.user
      })
      .catch((error: ErrorEvent) => {
        userResponse.response = error.message
        userResponse.isError = true
      })

    return userResponse
  }

  static async signIn(email: string, password: string): Promise<UserResponse> {
    const userResponse: UserResponse = {
      response: undefined,
      isError: false,
    }
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        userResponse.response = userCredential.user
      })
      .catch((error) => {
        userResponse.response = error
        userResponse.isError = true
      })
    return userResponse
  }

  static async signOut(): Promise<UserResponse> {
    const userResponse: UserResponse = {
      response: undefined,
      isError: false,
    }
    await authSignOut(this.auth)
      .then((data) => {
        userResponse.response = data
      })
      .catch((err: ErrorEvent) => {
        userResponse.response = err.message
        userResponse.isError = true
      })

    return userResponse
  }

  static async resetPassword(email: string): Promise<UserResponse> {
    const userResponse: UserResponse = {
      response: undefined,
      isError: false,
    }

    await sendPasswordResetEmail(this.auth, email)
      .then((data) => {
        userResponse.response = data
      })
      .catch((error: ErrorEvent) => {
        userResponse.response = error.message
        userResponse.isError = true
      })

    return userResponse
  }

  static getUserId(): string | undefined {
    const currentUser = this.auth.currentUser
    return currentUser ? currentUser.uid : undefined
  }

  static getUserMail(): string | undefined {
    const currentUser = this.auth.currentUser
    return currentUser?.email ? currentUser.email : undefined
  }
}
