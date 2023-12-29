import { Paper, Container } from '@mui/material'
import Link from 'next/link'
import { Pages } from '~/types/pages/page'

type Props = {
  page: Pages
}

function Item(props: Props) {
  const onClick = () => {
    if (!props.page.url) return
  }

  return (
    <Link href={props.page.url} onClick={onClick}>
      <Container
        className='flex h-32 w-52 cursor-pointer items-center justify-center laptop:h-40 laptop:w-60'
        component={Paper}
      >
        {props.page.name}
      </Container>
    </Link>
  )
}

export default Item
