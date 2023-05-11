import SendIcon from '@mui/icons-material/Send'
import { Autocomplete, TextField } from '@mui/material'
import {
  Control,
  UseFormWatch,
  UseFormHandleSubmit,
  FieldErrorsImpl,
  Controller,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SubmitButton from '~/components/base/Button/SubmitButton'
import TextController from '~/components/base/FormField/TextController'
import UserGuard from '~/components/guards/UserGuard'
import { Form } from '~/types/form'
import { AllLanguage } from '~/types/form/const'
import Preview from './Preview'

export type Props = {
  control: Control<Form>
  isSubmit: boolean
  errors: Partial<FieldErrorsImpl<Form>>
  watch: UseFormWatch<Form>
  onChangeLang: (value: string) => void
  onChangeLang2: (value: string) => void
  onSubmit: () => void
  handleSubmit: UseFormHandleSubmit<Form>
}

function Layout(props: Props) {
  const [t] = useTranslation()

  return (
    <UserGuard>
      <form
        className='flex w-full flex-col items-center'
        onSubmit={props.handleSubmit(props.onSubmit)}
      >
        <div className='flex w-4/6 flex-col'>
          <TextController
            control={props.control}
            errors={props.errors}
            label={t('Form.name')}
            name='name'
            required
            rules={{ required: t('Alert.required.name') as string }}
          />
          <TextController
            control={props.control}
            errors={props.errors}
            label={t('Form.question')}
            name='question'
            required
            rules={{ required: t('Alert.required.question') as string }}
          />
          <TextController
            control={props.control}
            errors={props.errors}
            label={t('Form.problem')}
            multiline
            name='problem'
            required
            rules={{ required: t('Alert.required.problem') as string }}
          />
          <Controller
            control={props.control}
            name='lang'
            render={() => (
              <Autocomplete
                className='my-4 w-full'
                onChange={(_, value) => props.onChangeLang(value as string)}
                options={AllLanguage}
                renderInput={(params) => (
                  <TextField
                    error={props.errors['lang'] ? true : false}
                    helperText={props.errors['lang']?.message as string}
                    label={t('Form.lang') as string}
                    placeholder='特に指定がなければPythonになります'
                    {...params}
                  />
                )}
              />
            )}
          />
          <Controller
            control={props.control}
            name='code'
            render={({ field }) => (
              <TextField
                className='my-4 w-full'
                error={props.errors['code'] ? true : false}
                helperText={props.errors['code']?.message as string}
                label={t('Form.code') as string}
                multiline
                {...field}
              />
            )}
          />
          <Preview
            code='code'
            control={props.control}
            lang='lang'
            watch={props.watch}
          />
          <Controller
            control={props.control}
            name='lang2'
            render={() => (
              <Autocomplete
                className='my-4 w-full'
                onChange={(_, value) => props.onChangeLang2(value as string)}
                options={AllLanguage}
                renderInput={(params) => (
                  <TextField
                    error={props.errors['lang2'] ? true : false}
                    helperText={props.errors['lang2']?.message as string}
                    label={t('Form.lang2') as string}
                    placeholder='特に指定がなければPythonになります'
                    {...params}
                  />
                )}
              />
            )}
          />
          <Controller
            control={props.control}
            name='code2'
            render={({ field }) => (
              <TextField
                className='my-4 w-full'
                error={props.errors['code2'] ? true : false}
                helperText={props.errors['code2']?.message as string}
                label={t('Form.code2') as string}
                multiline
                {...field}
              />
            )}
          />
          <Preview
            code='code2'
            control={props.control}
            lang='lang2'
            watch={props.watch}
          />
          <Controller
            control={props.control}
            name='reference'
            render={({ field }) => (
              <TextField
                className='my-4 w-full'
                error={props.errors['reference'] ? true : false}
                helperText={props.errors['reference']?.message as string}
                label={t('Form.reference')}
                multiline
                {...field}
              />
            )}
          />
          <TextController
            control={props.control}
            errors={props.errors}
            label={t('Form.expectation')}
            multiline
            name='expectation'
            required
            rules={{
              required: t('Alert.required.expectation') as string,
            }}
          />
          <Controller
            control={props.control}
            name='mentor'
            render={({ field }) => (
              <TextField
                className='my-4 w-full'
                error={props.errors['mentor'] ? true : false}
                helperText={props.errors['mentor']?.message as string}
                label={t('Form.mentor')}
                {...field}
              />
            )}
          />
        </div>
        <div>
          <SubmitButton isLoading={props.isSubmit} onClick={props.onSubmit}>
            <span className='flex items-center justify-center gap-1'>
              <SendIcon fontSize='small' />
              {t('Button.submit')}
            </span>
          </SubmitButton>
        </div>
      </form>
    </UserGuard>
  )
}

export default Layout
