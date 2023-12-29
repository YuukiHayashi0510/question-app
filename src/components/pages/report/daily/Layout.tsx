import { Chip, MenuItem, Select, Typography } from '@mui/material'
import { Control, FieldErrorsImpl, UseFormHandleSubmit } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SubmitButton from '~/components/base/Button/SubmitButton'
import DateField from '~/components/base/FormField/DateField'
import RoleGuard from '~/guards/RoleGuard'
import { Report } from '~/types/pages/report'
import { Role } from '~/types/pages/user/const'
import Mtg from './parts/Mtg'
import Section from './parts/Section'

export type Props = {
  control: Control<Report>
  isSubmit: boolean
  isUpdate: boolean
  date: Date
  errors: Partial<FieldErrorsImpl<Report>>
  onChangeSelect: (value: string) => void
  onSubmit: () => void
  handleSubmit: UseFormHandleSubmit<Report>
}

function Layout(props: Props) {
  const [t] = useTranslation()

  return (
    <RoleGuard role={Role.Mentor}>
      <form
        className='mt-10 flex w-3/5 flex-col items-center justify-center rounded-lg border-2 py-20'
        onSubmit={props.handleSubmit(props.onSubmit)}
      >
        <div className='mb-4 w-3/5'>
          <Typography className='my-10 text-center' component='h5' variant='h5'>
            日報フォーム
          </Typography>
          <div>
            <Select
              className='w-28'
              defaultValue='new'
              onChange={(e) => props.onChangeSelect(e.target.value)}
            >
              <MenuItem defaultChecked value='new'>
                新規記入
              </MenuItem>
              <MenuItem value='update'>更新</MenuItem>
            </Select>
          </div>
          <div className='my-4 flex gap-2'>
            <div className='flex items-center justify-center'>
              <Chip color='info' label='日付' variant='outlined' />
            </div>
            <DateField control={props.control} name='date' />
          </div>
          <Section
            control={props.control}
            errors={props.errors}
            sectionName='con'
          />
          <Mtg control={props.control} errors={props.errors} />
          <div className='text-center'>
            <SubmitButton isLoading={props.isSubmit} onClick={props.onSubmit}>
              {t('Button.submit')}
            </SubmitButton>
          </div>
        </div>
      </form>
    </RoleGuard>
  )
}

export default Layout
