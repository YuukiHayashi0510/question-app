import React from 'react'

import Header from '~/components/layout/header'
import Admin from '~/components/pages/admin'
import { PageType } from '~/types/page'

const index = () => {
  return (
    <>
      <Header title={PageType.Admin.Top.name} />
      <Admin />
    </>
  )
}

export default index
