import React from 'react'
import Header from '~/components/Layout/Header'
import ReportManage from '~/components/pages/admin/report'
import { PageType } from '~/types/pages/page'

function report() {
  return (
    <>
      <Header title={PageType.Admin.Report.name} />
      <ReportManage />
    </>
  )
}

export default report
