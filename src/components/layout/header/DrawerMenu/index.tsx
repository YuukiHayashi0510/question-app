import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Item from '~/components/layout/header/DrawerMenu/Item'
import { useAdmin } from '~/components/provider/AdminProvider'
import { useSessionUser } from '~/components/provider/SessionUserProvider'
import { authSignOut } from '~/lib/Firebase/auth'
import { PageType } from '~/types/page'
import { SetState } from '~/types/utils'

type Props = {
  setIsOpen: SetState<boolean>
}

function DrawerMenu(props: Props) {
  const { context: sessionUser, setContext: setSessionUser } = useSessionUser()
  const { context: admin, setContext: setAdmin } = useAdmin()
  const [t] = useTranslation()

  const onClickLogout = async () => {
    const { isError, response } = await authSignOut()
    if (isError) {
      alert(response.message)
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
        {sessionUser['role'] && <Item page={PageType.User} />}
        {sessionUser['role'] === 'メンター' && <Item page={PageType.Mentor} />}
        {sessionUser['role'] === '管理者' && <Item page={PageType.Admin} />}
        {sessionUser['role'] ? (
          <Link href={PageType.Standard.Top.url} onClick={onClickLogout}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={t('User.logout')} />
              </ListItemButton>
            </ListItem>
          </Link>
        ) : null}
      </List>
    </Box>
  )
}

export default DrawerMenu
