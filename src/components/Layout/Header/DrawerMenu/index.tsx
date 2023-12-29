import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { useAlert } from 'react-alert'
import { useTranslation } from 'react-i18next'
import Item from '~/components/Layout/Header/DrawerMenu/Item'
import { AuthRepository } from '~/infrastructure/repository/firebase/authRepository'
import { useAdmin } from '~/providers/AdminProvider'
import { useSessionUser } from '~/providers/SessionUserProvider'
import { PageType } from '~/types/pages/page'
import RoleView from './role'

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

function DrawerMenu(props: Props) {
  const { context: sessionUser, setContext: setSessionUser } = useSessionUser()
  const { context: admin, setContext: setAdmin } = useAdmin()
  const [t] = useTranslation()
  const alert = useAlert()

  const onClickLogout = async () => {
    const { isError, response } = await AuthRepository.signOut()
    if (isError) {
      alert.error(response.message)
      return
    }
    if (sessionUser['role'])
      setSessionUser({ id: '', name: '', role: undefined })
    if (admin.user.length > 0 || admin.report.length > 0)
      setAdmin({ user: [], report: [] })
  }

  return (
    <Box
      onClick={() => props.setIsOpen(false)}
      onKeyDown={() => props.setIsOpen(false)}
      role='presentation'
    >
      <List>
        {Object.keys(PageType.Standard).map((value, index) => {
          if (sessionUser['role'] && value === 'Register') return
          return (
            <Link href={PageType.Standard[value]['url']} key={index}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={t(PageType.Standard[value]['name'])} />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        })}
        {sessionUser['role'] && (
          <>
            <Item page={PageType.User} />
            <RoleView role={sessionUser['role']} />
            <Link href={PageType.Standard.Top.url} onClick={onClickLogout}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={t('User.logout')} />
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        )}
      </List>
    </Box>
  )
}

export default DrawerMenu
