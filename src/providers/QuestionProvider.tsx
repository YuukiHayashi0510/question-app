import { createContext, ReactNode, useContext, useState } from 'react'
import { QuestionContext as Context } from '~/types/app'

type Props = {
  children: ReactNode
}

const QuestionContext = createContext<Context>({} as any)

function QuestionProvider(props: Props) {
  const [context, setContext] = useState<Context['context']>({
    list: [],
    maxSize: 0,
  })

  return (
    <QuestionContext.Provider value={{ context, setContext }}>
      {props.children}
    </QuestionContext.Provider>
  )
}

export default QuestionProvider

export const useQuestion = () => useContext(QuestionContext)
