import { UseFormHandleSubmit } from 'react-hook-form'

import ResetPassModal, {
  CustomProps as ModalProps,
} from '~/components/pages/register/parts/ResetPassModal'
import RegisterGuard from '~/guards/RegisterGuard'
import { User } from '~/types/pages/user'

import Form, { FormProps } from './parts/Form'
import { FormBottom, Props as BottomProps } from './parts/FormBottom'

export type Props = {
  formProps: FormProps
  modalProps: ModalProps
  bottomProps: BottomProps
  onSubmit: () => void
  handleSubmit: UseFormHandleSubmit<User>
}

function Layout(props: Props) {
  return (
    <RegisterGuard>
      <form
        className='mt-6 flex w-4/5 flex-col items-center justify-center rounded-lg border-2 py-10 laptop:mt-10 laptop:w-3/5 laptop:py-20 desktop:w-2/5'
        onSubmit={props.handleSubmit(props.onSubmit)}
      >
        <div className='mb-4 w-4/5'>
          <Form {...props.formProps} />
        </div>
        <FormBottom {...props.bottomProps} />
      </form>
      <ResetPassModal {...props.modalProps} />
    </RegisterGuard>
  )
}

export default Layout
