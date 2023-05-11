import { useEffect, useState } from 'react'
import { useQuestion } from '~/components/provider/QuestionProvider'
import { QuestionList } from '~/types/question'
import { getQuestion } from '../Firebase/firestore'
import type { StoreQuestion } from '../Firebase/firestore'

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

      const snapshot = await getQuestion()
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
