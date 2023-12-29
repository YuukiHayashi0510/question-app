import ClearIcon from '@mui/icons-material/Clear'
import RestoreIcon from '@mui/icons-material/Restore'
import SortIcon from '@mui/icons-material/Sort'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AllStateType } from '~/types/pages/form/const'
import { Sort } from '~/types/pages/question'
import { Order } from '~/types/pages/question/const'

export type Props = {
  sort: Sort
  onChangeStateSort: (value: Sort['state']) => void
  onChangeDateSort: (value: Sort['date']) => void
  onClickSort: () => void
  onClickClear: () => void
  onClickRestore: () => void
}

function SortTab(props: Props) {
  const [t] = useTranslation()

  return (
    <div className='hidden w-1/3 laptop:block'>
      <div className='my-2 flex w-2/3 rounded border-2 p-2'>
        <div className='mx-auto my-10 flex w-3/4 flex-col gap-6'>
          <FormControl>
            <InputLabel id='select'>{t('Question.state')}</InputLabel>
            <Select
              defaultValue=''
              label={t('Question.state')}
              labelId='select'
              onChange={(e) =>
                props.onChangeStateSort(e.target.value as Sort['state'])
              }
              value={props.sort['state']}
            >
              <MenuItem hidden></MenuItem>
              {AllStateType.map((type, idx) => {
                return (
                  <MenuItem key={idx} value={type}>
                    {t(`Sort.state.${type}`)}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel id='date-radio-buttons-group-label'>
              {t('Sort.date.title')}
            </FormLabel>
            <RadioGroup
              aria-labelledby='date-radio-buttons-group-label'
              defaultValue=''
              name='radio-buttons-group'
              onChange={(e) =>
                props.onChangeDateSort(e.target.value as Sort['date'])
              }
              value={props.sort['date']}
            >
              <FormControlLabel
                control={<Radio />}
                label={t('Sort.date.descending')}
                value={Order.Desc}
              />
              <FormControlLabel
                control={<Radio />}
                label={t('Sort.date.ascending')}
                value={Order.Asc}
              />
            </RadioGroup>
          </FormControl>
          <div className='flex flex-col items-center gap-4'>
            <Button
              className='flex gap-1 border-2'
              color='success'
              onClick={props.onClickSort}
              variant='outlined'
            >
              <SortIcon fontSize='small' />
              {t('Sort.action')}
            </Button>
            <Button
              className='flex gap-1 border-2'
              color='secondary'
              onClick={props.onClickClear}
              variant='outlined'
            >
              <ClearIcon fontSize='small' />
              {t('Sort.clear')}
            </Button>
            <Button
              className='flex gap-1 border-2'
              color='info'
              onClick={props.onClickRestore}
              variant='outlined'
            >
              <RestoreIcon fontSize='small' />
              {t('Sort.restore')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortTab
