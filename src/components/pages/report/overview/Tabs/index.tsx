import { Tab, Tabs, Container, Button } from '@mui/material'
import 'react-datepicker/dist/react-datepicker.css'
import ja from 'date-fns/locale/ja'
import { useRouter } from 'next/router'
import { SyntheticEvent } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import { PageType } from '~/types/pages/page'
import { useTabs } from './TabProvider'

export type Props = {
  date: Date
  onChangeDate: (date: Date, event: SyntheticEvent) => void
}

function TabsMenu(props: Props) {
  const { context: tabValue, setContext: setTabValue } = useTabs()
  const router = useRouter()

  registerLocale('ja', ja)

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const handleChange = (event: SyntheticEvent, newValue: string) =>
    setTabValue(Number(newValue))

  const onClickWriteReport = () => {
    router.push(PageType.Mentor.Daily.url)
  }

  return (
    <Container className='flex gap-8 p-0'>
      <Tabs className='bg-neutral-50' onChange={handleChange} value={tabValue}>
        <Tab
          className='text-ai-main'
          label='日間'
          value={0}
          wrapped
          {...a11yProps(0)}
        />
        <Tab
          className='text-ai-main'
          label='週間'
          value={1}
          {...a11yProps(1)}
        />
        <Tab
          className='text-ai-main'
          label='月間'
          value={2}
          {...a11yProps(2)}
        />
      </Tabs>
      <div>
        <ReactDatePicker
          className='rounded border-2 p-2 text-lg'
          dateFormat='yyyy/MM/dd'
          locale='ja'
          onChange={props.onChangeDate}
          selected={props.date}
        />
      </div>
      <div>
        <Button
          className='h-full bg-blue-600 px-4'
          onClick={onClickWriteReport}
          variant='contained'
        >
          日報を書く
        </Button>
      </div>
    </Container>
  )
}

export default TabsMenu
