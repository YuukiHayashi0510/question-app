import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from '~/types/pages/user'
import { AllRole } from '~/types/pages/user/const'

import ModalTemplate, { Props } from '../../../base/Modal'

export type CustomProps = Props & {
  modalValue: Omit<User, 'mail' | 'password'>
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onChangeModalName: (value: string) => void
  onChangeModalRole: (value: string) => void
  onClickUpdate: () => void
}

function AdminModal(props: CustomProps) {
  const [t] = useTranslation()

  return (
    <ModalTemplate isOpen={props.isOpen} onClose={() => props.setIsOpen(false)}>
      <TextField
        className='my-2 w-3/4'
        label={t('User.name')}
        onChange={(e) => props.onChangeModalName(e.target.value)}
        value={props.modalValue['name']}
      />
      <FormControl className='my-2 w-3/4'>
        <InputLabel id='select'>{t('User.role')}</InputLabel>
        <Select
          label={t('User.role')}
          labelId='select'
          onChange={(e) => props.onChangeModalRole(e.target.value)}
          value={props.modalValue['role']}
        >
          {AllRole.map((type, idx) => {
            return (
              <MenuItem key={idx} value={type}>
                {type}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <Button className='my-2' onClick={props.onClickUpdate} variant='outlined'>
        <span className='flex items-center justify-center gap-1'>
          <SyncAltOutlinedIcon fontSize='small' />
          {t('User.update')}
        </span>
      </Button>
    </ModalTemplate>
  )
}

export default AdminModal
