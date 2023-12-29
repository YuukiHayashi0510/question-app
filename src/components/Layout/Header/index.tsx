import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Container, Drawer, IconButton, Toolbar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DrawerMenu from '~/components/Layout/Header/DrawerMenu'
import { useDrawer } from '~/hooks/useDrawer'
import ToggleLanguage from './Language'

type Props = {
  title: string
}

function Header(props: Props) {
  const [isOpen, setIsOpen] = useDrawer()
  const [t] = useTranslation()

  return (
    <AppBar className='mb-10 bg-ai-main' position='static'>
      <Toolbar>
        <IconButton
          aria-label='menu'
          color='inherit'
          edge='start'
          onClick={() => setIsOpen(true)}
          size='large'
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor='left' onClose={() => setIsOpen(false)} open={isOpen}>
          <DrawerMenu setIsOpen={setIsOpen} />
        </Drawer>

        <Container className='relative text-xl'>
          <span className='left-4 top-1/2 -translate-y-1/2 desktop:absolute'>
            {t(props.title)}
          </span>
        </Container>
        <ToggleLanguage />
      </Toolbar>
    </AppBar>
  )
}

export default Header
