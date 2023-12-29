import { Timestamp } from 'firebase/firestore'
import { t } from 'i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useForm } from 'react-hook-form'
import { Props } from '~/components/pages/question/form/Layout'
import QuestionRepository from '~/infrastructure/repository/firebase/questionRepository'
import SlackRepository from '~/infrastructure/repository/slack/slackRepository'
import { useQuestion } from '~/providers/QuestionProvider'
import { useSessionUser } from '~/providers/SessionUserProvider'
import { Form } from '~/types/pages/form'
import { initForm } from '~/types/pages/form/const'
import { PageType } from '~/types/pages/page'
import { Question } from '~/types/pages/question'

export function useProps(): Props {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    watch,
    getValues,
    setValue,
  } = useForm<Form>({
    defaultValues: initForm,
    criteriaMode: 'all',
    shouldFocusError: false,
    mode: 'onChange',
  })

  const [isSubmit, setIsSubmit] = useState<Props['isSubmit']>(false)

  const { context: sessionUser } = useSessionUser()
  const { setContext: setQuestion } = useQuestion()

  const router = useRouter()
  const alert = useAlert()

  useEffect(() => {
    if (sessionUser.role) setValue('name', sessionUser.name)
  }, [])

  const onSubmit: Props['onSubmit'] = async () => {
    if (!isValid) {
      alert.error(t('Alert.valid.submit'))
      return
    }

    setIsSubmit(true)
    const form = getValues()
    const q: Question = { ...form, date: Timestamp.now() }
    const id = await QuestionRepository.insertQuestion(form)

    if (id) q.id = id
    setQuestion((prev) => ({ ...prev, list: [q, ...prev.list] }))
    await SlackRepository.sendQuestion(form)
    setIsSubmit(false)
    router.push(PageType.Standard.Question.url)
  }

  return {
    control,
    isSubmit,
    watch,
    onChangeLang: (value) => setValue('lang', value),
    onChangeLang2: (value) => setValue('lang2', value),
    onSubmit,
    handleSubmit,
  }
}
