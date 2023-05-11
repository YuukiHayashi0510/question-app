import { Timestamp } from 'firebase/firestore'
import { t } from 'i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Props } from '~/components/pages/question/form/Layout'
import { useQuestion } from '~/components/provider/QuestionProvider'
import { useSessionUser } from '~/components/provider/SessionUserProvider'
import { insertQuestion } from '~/lib/Firebase/firestore'
import { sendToQuestion } from '~/lib/Slack/lib/send'
import { Form } from '~/types/form'
import { initForm } from '~/types/form/const'
import { PageType } from '~/types/page'
import { Question } from '~/types/question'

export function useProps(): Props {
  const {
    control,
    formState: { errors, isValid },
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

  useEffect(() => {
    if (sessionUser.role) setValue('name', sessionUser.name)
  }, [])

  const onSubmit: Props['onSubmit'] = async () => {
    if (!isValid) {
      alert(t('Alert.valid.submit'))
      return
    }

    setIsSubmit(true)
    const form = getValues()
    const q: Question = { ...form, date: Timestamp.now() }
    const id = await insertQuestion(form)

    if (id) q.id = id
    setQuestion((prev) => ({ ...prev, list: [q, ...prev.list] }))
    sendToQuestion(form)
    setIsSubmit(false)
    router.push(PageType.Standard.Question.url)
  }

  return {
    control,
    isSubmit,
    errors,
    watch,
    onChangeLang: (value) => setValue('lang', value),
    onChangeLang2: (value) => setValue('lang2', value),
    onSubmit,
    handleSubmit,
  }
}
