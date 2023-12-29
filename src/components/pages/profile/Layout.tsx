import { TextField } from '@mui/material'
import React from 'react'
import { Control, UseFormHandleSubmit, UseFormWatch } from 'react-hook-form'
import SubmitButton from '~/components/base/Button/SubmitButton'
import AreaController from '~/components/base/FormField/AreaController/Profile'
import TextController from '~/components/base/FormField/TextController'
import UserGuard from '~/guards/UserGuard'
import { Profile } from '~/types/pages/user'

export type Props = {
  control: Control<Profile>
  isLoading: boolean
  watch: UseFormWatch<Profile>
  onSubmit: () => void
  handleSubmit: UseFormHandleSubmit<Profile>
}

function Layout({ control, isLoading, watch, onSubmit, handleSubmit }: Props) {
  return (
    <UserGuard>
      <form
        className='my-16 flex w-2/3 flex-col gap-4 laptop:w-1/2 laptop:rounded-lg laptop:border-2 laptop:px-16 laptop:shadow desktop:px-28 desktop:py-20'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className='text-center text-2xl'>アカウント情報</h3>
        <TextField
          disabled
          fullWidth
          label='メールアドレス'
          value={watch('mail')}
        />
        <TextController control={control} label='名前' name='name' />
        <AreaController control={control} />
        <TextField
          className='mt-4'
          disabled
          fullWidth
          label='権限'
          value={watch('role')}
        />
        <div className='my-8 flex justify-center'>
          <SubmitButton isLoading={isLoading} onClick={onSubmit}>
            変更
          </SubmitButton>
        </div>
      </form>
    </UserGuard>
  )
}

export default Layout
