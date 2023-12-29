import { ReactNode } from 'react'
import CustomHead from '~/components/Layout/CustomHead'
import Footer from '~/components/Layout/Footer'

type Props = {
  children: ReactNode
}

function Layout(props: Props) {
  return (
    <>
      <CustomHead />
      <div className='flex min-h-screen flex-col items-center'>
        {props.children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
