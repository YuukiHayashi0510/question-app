import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import { useTranslation } from 'react-i18next'
import LoadingButton from '~/components/base/Button/LoadingButton'
import QuestionCard, {
  Props as CardProps,
} from '~/components/pages/question/index/QuestionCard'
import SortTab, {
  Props as SortProps,
} from '~/components/pages/question/index/SortTab'
import { QuestionList } from '~/types/pages/question'

export type Props = {
  questionList: QuestionList
  isLoading: boolean
  disabled: boolean
  cardProps: Omit<CardProps, 'question' | 'index'>
  sortProps: SortProps
  onClickMore: () => void
}

function Layout(props: Props) {
  const [t] = useTranslation()

  return (
    <div className='flex w-full'>
      <div className='flex w-full flex-col items-center laptop:w-2/3'>
        {props.questionList.map((question, index) => {
          return (
            <div className='my-2 w-4/5' key={index}>
              <QuestionCard
                index={index}
                question={question}
                {...props.cardProps}
              />
            </div>
          )
        })}
        <LoadingButton
          className={!props.disabled ? 'my-6 w-3/4 bg-[#1976d2]' : 'my-6 w-3/4'}
          disabled={props.disabled}
          isLoading={props.isLoading}
          onClick={props.onClickMore}
          variant='contained'
        >
          <span className='flex items-center gap-1'>
            <ExpandMoreOutlinedIcon fontSize='small' />
            {t('Button.more')}
          </span>
        </LoadingButton>
      </div>
      <SortTab {...props.sortProps} />
    </div>
  )
}

export default Layout
