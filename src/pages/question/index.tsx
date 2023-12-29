import Header from '~/components/Layout/Header'
import Question from '~/components/pages/question/index/index'
import { PageType } from '~/types/pages/page'

const question = () => {
  return (
    <>
      <Header title={PageType.Standard.Question.name} />
      <Question />
    </>
  )
}

export default question
