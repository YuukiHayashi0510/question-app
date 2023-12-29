import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Button, Card } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProgressChip from '~/components/base/Chip/Progress'
import Detail from '~/components/pages/question/index/QuestionCard/Detail'
import StateChange from '~/components/pages/question/index/QuestionCard/StateChange'
import { DateLocale } from '~/helpers/date/locale'
import { isEnglish } from '~/helpers/locales/utils'
import { State } from '~/types/pages/form/const'
import { Role } from '~/types/pages/user/const'
import type { Question } from '~/types/pages/question'

export type Props = {
  index: number
  question: Question
  role?: Role
  onChangeState: (value: State, idx: number) => void
  onClickStateUpdate: (idx: number) => void
  onClickDelete: (idx: number) => void
}

function QuestionCard(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const date = props.question.date.toDate()

  const [t, i18n] = useTranslation()

  const onClickDetail = () => setIsOpen((prev) => !prev)

  return (
    <Card className='p-6' variant='outlined'>
      <div className='flex justify-between'>
        <ProgressChip label={props.question['state']} />
        <StateChange
          index={props.index}
          onChangeState={props.onChangeState}
          onClickStateUpdate={props.onClickStateUpdate}
          role={props.role}
          state={props.question['tmpState'] || State.Yet}
        />
      </div>
      <div className='my-2 rounded border-2 p-2'>
        <div>
          <span className='font-medium'>{t('Question.name')}</span>：
          {props.question['name']}
        </div>
        <div>
          <span className='font-medium'>{t('Question.mentor')}</span>：
          {props.question['mentor']}
        </div>
      </div>
      <div className='my-2 rounded border-2 p-2'>
        <p className='font-medium'>{t('Question.question')}</p>
        <div className='whitespace-pre-wrap break-words'>
          {props.question['question']}
        </div>
      </div>
      {isOpen ? <Detail question={props.question} /> : null}
      <div className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <Button
            className='my-2 py-2 text-xs laptop:text-sm'
            onClick={onClickDetail}
            variant='outlined'
          >
            {isOpen ? (
              <span className='flex items-center justify-center gap-1'>
                <CloseOutlinedIcon fontSize='small' />
                {t('Button.close')}
              </span>
            ) : (
              <span className='flex items-center justify-center gap-1'>
                <InfoOutlinedIcon fontSize='small' />
                {t('Button.detail')}
              </span>
            )}
          </Button>
          {props.role && props.role !== Role.Student ? (
            <Button
              className='my-2'
              color='error'
              onClick={() => props.onClickDelete(props.index)}
              variant='outlined'
            >
              <span className='flex items-center justify-center gap-1'>
                <DeleteOutlinedIcon fontSize='small' />
                {t('Button.delete')}
              </span>
            </Button>
          ) : null}
        </div>
        <div className='text-right text-sm laptop:text-base'>
          {isEnglish(i18n.language)
            ? DateLocale.translateEnglish(date)
            : DateLocale.translateJapanese(date)}
        </div>
      </div>
    </Card>
  )
}

export default QuestionCard
