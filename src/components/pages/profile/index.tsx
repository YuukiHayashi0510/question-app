import React from 'react'
import Layout from './Layout'
import { useProps } from './useProps'

function Profile() {
  return <Layout {...useProps()} />
}

export default Profile
