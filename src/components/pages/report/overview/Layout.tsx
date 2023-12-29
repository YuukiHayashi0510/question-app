import { CircularProgress } from '@mui/material'
import RoleGuard from '~/guards/RoleGuard'
import { Report } from '~/types/pages/report'
import { Role } from '~/types/pages/user/const'
import DailyPanel from './Panel/Daily'
import MonthlyPanel from './Panel/Monthly'
import WeeklyPanel from './Panel/Weekly'
import TabsMenu, { Props as TabProps } from './Tabs'

export type Props = {
  date: Date
  dailyReport?: Report
  weeklyReport: Report[]
  monthlyReport: Report[]
  isLoading: boolean
  onChangeDate: TabProps['onChangeDate']
}

function Layout(props: Props) {
  return (
    <RoleGuard role={Role.Mentor}>
      {props.isLoading ? (
        <CircularProgress disableShrink thickness={4} />
      ) : (
        <div className='mt-10 flex flex-col items-center justify-start'>
          <TabsMenu date={props.date} onChangeDate={props.onChangeDate} />
          <DailyPanel date={props.date} report={props.dailyReport} />
          <WeeklyPanel date={props.date} report={props.weeklyReport} />
          <MonthlyPanel date={props.date} report={props.monthlyReport} />
        </div>
      )}
    </RoleGuard>
  )
}

export default Layout
