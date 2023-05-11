import React from 'react'
import Header from '~/components/layout/header'
import ReportManage from '~/components/pages/admin/report'
import { PageType } from '~/types/page'

function report() {
  return (
    <>
      <Header title={PageType.Admin.Report.name} />
      <ReportManage />
    </>
  )
}

export default report
