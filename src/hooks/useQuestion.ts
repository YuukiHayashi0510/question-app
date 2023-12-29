import { useEffect, useState } from 'react'
import QuestionRepository from '~/infrastructure/repository/firebase/questionRepository'
import { useQuestion } from '~/providers/QuestionProvider'
import { StoreQuestion } from '~/types/infrastructure/firebase/firestore'
import { QuestionList } from '~/types/pages/question'

export function useQuestionList() {
  const [questionList, setQuestionList] = useState<QuestionList>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { context, setContext } = useQuestion()

  useEffect(() => {
    const f = async () => {
      setIsLoading(true)
      if (context['list'].length > 0) {
        setQuestionList(context['list'])
        setIsLoading(false)
        return
      }

      const snapshot = await QuestionRepository.getQuestion()
      const tmpArray: QuestionList = []

      snapshot.forEach((doc) => {
        const docData = doc.data() as StoreQuestion
        tmpArray.push({
          ...docData,
          id: doc.id,
          tmpState: docData['state'],
        })
      })

      tmpArray.sort((a, b) => {
        if (a['date'] > b['date']) return -1
        if (a['date'] < b['date']) return 1
        return 0
      })

      setQuestionList(tmpArray)
      setContext({ list: tmpArray, maxSize: tmpArray.length })
      setIsLoading(false)
    }
    f()
  }, [])

  return { questionList, setQuestionList, isLoading, setIsLoading }
}
