import React from 'react'

import Header from '~/components/Layout/Header'
import Admin from '~/components/pages/admin'
import { PageType } from '~/types/pages/page'

const index = () => {
  return (
    <>
      <Header title={PageType.Admin.Top.name} />
      <Admin />
    </>
  )
}

export default index
