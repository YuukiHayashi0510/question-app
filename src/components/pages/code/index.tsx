import React from 'react'
import Layout from './Layout'
import { useProps } from './useProps'

function CodeTest() {
  return <Layout {...useProps()} />
}

export default CodeTest
