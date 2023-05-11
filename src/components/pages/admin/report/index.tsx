import React from 'react'
import Layout from './Layout'
import { useProps } from './useProps'

function ReportManage() {
  return <Layout {...useProps()} />
}

export default ReportManage
