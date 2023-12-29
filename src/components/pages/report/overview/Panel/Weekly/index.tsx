import React from 'react'
import { DayUtil } from '~/helpers/date/day'
import { DateLocale } from '~/helpers/date/locale'
import { Report } from '~/types/pages/report'
import LineChart from './BarChart'
import TabPanel from '../../Tabs/TabPanel'
import PieChart from '../common/PieChart'
import TotalTable from '../common/TotalTable'

export type Props = {
  date: Date
  report: Report[]
}

function WeeklyPanel({ date, report }: Props) {
  const monday = DayUtil.getMonday(date)
  const mondayStr = DateLocale.translateShortJapanese(monday)
  const sunday = DateLocale.translateShortJapanese(DayUtil.getSunday(date))

  return (
    <>
      <TabPanel index={1}>
        <p className='text-lg font-bold'>
          {mondayStr}~{sunday}
        </p>
        <div className='flex gap-10'>
          <div className='flex w-4/5 flex-col justify-center desktop:w-3/5'>
            <LineChart monday={monday} report={report} />
            <div className='ml-6 mt-10 flex gap-4 laptopL:hidden'>
              <div className='mt-8 w-1/2'>
                <TotalTable report={report} />
              </div>
              <div className='w-1/2'>
                <PieChart report={report} />
              </div>
            </div>
            <div className='m-10 hidden laptopL:block'>
              <TotalTable report={report} />
            </div>
          </div>
          <div className='hidden desktop:w-2/5 laptopL:block'>
            <PieChart report={report} />
          </div>
        </div>
      </TabPanel>
    </>
  )
}

export default WeeklyPanel
