import { Dispatch, SetStateAction } from 'react'

export type SetState<T> = Dispatch<SetStateAction<T>>

export type ContextType<T> = {
  context: T
  setContext: SetState<T>
}

export enum Env {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}
