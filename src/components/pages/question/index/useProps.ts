import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { Props } from '~/components/pages/question/index/Layout'
import { useQuestionList } from '~/hooks/useQuestion'
import QuestionRepository from '~/infrastructure/repository/firebase/questionRepository'
import { useQuestion } from '~/providers/QuestionProvider'
import { useSessionUser } from '~/providers/SessionUserProvider'
import { State } from '~/types/pages/form/const'
import { Question, QuestionList } from '~/types/pages/question'
import { sortQuestionList } from './utils'

export function useProps(): Props {
  const [sort, setSort] = useState<Props['sortProps']['sort']>({
    state: '',
    date: '',
  })
  const [disabled, setDisabled] = useState<Props['disabled']>(false)
  const { context, setContext } = useQuestion()
  const { questionList, setQuestionList, isLoading, setIsLoading } =
    useQuestionList()
  const { context: sessionUser } = useSessionUser()

  useEffect(() => {
    const f = async () => {
      if (!sessionUser['role']) {
        setDisabled(true)
        return
      }

      setIsLoading(true)
      const maxSize = await QuestionRepository.getQuestionNum()
      setContext((prev) => ({ ...prev, maxSize }))
      setDisabled(maxSize <= 3 || context['maxSize'] === maxSize)
      setIsLoading(false)
    }
    f()
  }, [])

  const onChangeState: Props['cardProps']['onChangeState'] = (value, idx) => {
    const newValue: Question = {
      ...questionList[idx],
      tmpState: value,
    }
    setQuestionList((old) => old.map((q, i) => (i === idx ? newValue : q)))
  }

  const onClickMore = async () => {
    setIsLoading(true)
    const snapshot = await QuestionRepository.getQuestionMore(
      questionList.length + 3
    )
    const tmpArray: QuestionList = []

    snapshot.forEach((doc) => {
      const docData = doc.data() as Question
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
    setContext((old) => ({ ...old, list: tmpArray }))
    setSort({ state: '', date: '' })
    setIsLoading(false)
    setDisabled(questionList.length + 3 >= context['maxSize'])
  }

  const onClickStateUpdate: Props['cardProps']['onClickStateUpdate'] = async (
    idx
  ) => {
    if (questionList[idx]['state'] === questionList[idx]['tmpState']) return

    const newValue: Question = {
      ...questionList[idx],
      state: questionList[idx]['tmpState'] as State,
    }

    await QuestionRepository.updateState(
      questionList[idx]['id'] as string,
      questionList[idx]['tmpState'] as State
    )

    setQuestionList((old) => old.map((q, i) => (i === idx ? newValue : q)))
    setContext((old) => ({
      ...old,
      list: old.list.map((q, i) => (i === idx ? newValue : q)),
    }))
  }

  const onClickDelete: Props['cardProps']['onClickDelete'] = async (idx) => {
    if (!confirm(t('Button.confirm') as string)) return

    await QuestionRepository.deleteQuestion(questionList[idx]['id'] as string)
    setQuestionList((old) => old.filter((_, i) => i !== idx))
    setContext((old) => ({ ...old, maxSize: old.maxSize - 1 }))
  }

  const onClickSort: Props['sortProps']['onClickSort'] = () => {
    const array = sortQuestionList(context['list'], sort)
    setQuestionList(array)
  }

  const onClickRestore: Props['sortProps']['onClickRestore'] = () => {
    setSort({ state: '', date: '' })
    setQuestionList(context['list'])
  }

  return {
    questionList,
    isLoading,
    disabled,
    cardProps: {
      role: sessionUser['role'],
      onChangeState,
      onClickStateUpdate,
      onClickDelete,
    },
    sortProps: {
      sort,
      onChangeStateSort: (value) => setSort({ ...sort, state: value }),
      onChangeDateSort: (value) => setSort({ ...sort, date: value }),
      onClickSort,
      onClickClear: () => setSort({ state: '', date: '' }),
      onClickRestore,
    },
    onClickMore,
  }
}
