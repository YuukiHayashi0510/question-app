import Header from '~/components/layout/header'
import Question from '~/components/pages/question/index/index'
import { PageType } from '~/types/page'

const question = () => {
  return (
    <>
      <Header title={PageType.Standard.Question.name} />
      <Question />
    </>
  )
}

export default question
