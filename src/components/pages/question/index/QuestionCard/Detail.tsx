import { useTranslation } from 'react-i18next'
import DetailCodeBlock from '~/components/pages/question/index/QuestionCard/DetailCodeBlock'
import { Question } from '~/types/pages/question'

type Props = {
  question: Question
}

function Detail(props: Props) {
  const [t] = useTranslation()

  return (
    <div className='my-2'>
      <div className='my-2 rounded border-2 p-2'>
        <p className='font-medium'>{t('Question.problem')}</p>
        <div className='whitespace-pre-wrap break-words'>
          {props.question['problem']}
        </div>
      </div>
      <DetailCodeBlock
        code={props.question['code']}
        lang={props.question['lang']}
        text={t('Question.code')}
      />
      <DetailCodeBlock
        code={props.question['code2']}
        lang={props.question['lang2']}
        text={t('Question.code2')}
      />
      {props.question['reference'].length > 0 ? (
        <div className='my-2 rounded border-2 p-2'>
          <p className='font-medium'>{t('Question.reference')}</p>
          <div className='whitespace-pre-wrap break-words'>
            {props.question['reference']}
          </div>
        </div>
      ) : null}
      {props.question['expectation'].length > 0 ? (
        <div className='my-2 rounded border-2 p-2'>
          <p className='font-medium'>{t('Question.expectation')}</p>
          <div className='whitespace-pre-wrap break-words'>
            {props.question['expectation']}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Detail
