import Header from '~/components/Layout/Header'
import { Form } from '~/components/pages/question/form'
import { PageType } from '~/types/pages/page'

const form = () => {
  return (
    <>
      <Header title={PageType.User.Form.name} />
      <Form />
    </>
  )
}

export default form
