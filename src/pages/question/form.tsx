import Header from '~/components/layout/header'
import { Form } from '~/components/pages/question/form'
import { PageType } from '~/types/page'

const form = () => {
  return (
    <>
      <Header title={PageType.User.Form.name} />
      <Form />
    </>
  )
}

export default form
