import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AllStateType, State } from '~/types/pages/form/const'
import { Role } from '~/types/pages/user/const'

type Props = {
  role?: Role
  state: State
  index: number
  onChangeState: (value: State, idx: number) => void
  onClickStateUpdate: (idx: number) => void
}

function StateChange(props: Props) {
  const [t] = useTranslation()

  return (
    <div>
      {props.role && props.role !== Role.Student ? (
        <div className='flex items-center'>
          <FormControl className='my-2'>
            <InputLabel id='select'>{t('Question.state')}</InputLabel>
            <Select
              defaultValue={State.Yet}
              label={t('Question.state')}
              labelId='select'
              onChange={(e) =>
                props.onChangeState(e.target.value as State, props.index)
              }
              value={props.state}
            >
              {AllStateType.map((type, idx) => {
                return (
                  <MenuItem key={idx} value={type}>
                    {t(`Sort.state.${type}`)}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <Button
            className='ml-2 py-4'
            onClick={() => props.onClickStateUpdate(props.index)}
            variant='outlined'
          >
            <EditOutlinedIcon fontSize='small' />
            {t('Button.change')}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default StateChange
