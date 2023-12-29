import { Divider, ListItem, ListItemButton, ListItemText } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

type Props = {
  page: object
}

function Item(props: Props) {
  const [t] = useTranslation()

  return (
    <>
      {Object.keys(props.page).map((value, index) => {
        return (
          <Link href={props.page[value]['url']} key={index}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={t(props.page[value]['name'])} />
              </ListItemButton>
            </ListItem>
          </Link>
        )
      })}
      <Divider />
    </>
  )
}

export default Item
