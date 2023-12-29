import React from 'react'
import { DateLocale } from '~/helpers/date/locale'
import { MonthUtil } from '~/helpers/date/month'
import { Report } from '~/types/pages/report'
import AreaChart from './AreaChart'
import TabPanel from '../../Tabs/TabPanel'
import PieChart from '../common/PieChart'
import TotalTable from '../common/TotalTable'

type Props = {
  date: Date
  report: Report[]
}

function MonthlyPanel({ date, report }: Props) {
  const month = {
    first: MonthUtil.getMonthFirstDate(date),
    last: MonthUtil.getMonthFinalDate(date),
  }
  const first = DateLocale.translateShortJapanese(month.first)
  const last = DateLocale.translateShortJapanese(month.last)

  return (
    <TabPanel index={2}>
      <p className='text-lg font-bold'>
        {first}~{last}
      </p>
      <div className='flex gap-10'>
        <div className='flex w-4/5 flex-col justify-center desktop:w-3/5'>
          <AreaChart month={month} report={report} />
          <div className='ml-6 mt-10 flex gap-4 laptopL:hidden'>
            <div className='w-1/2'>
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
        <div className='hidden w-2/5 laptopL:block'>
          <PieChart report={report} />
        </div>
      </div>
    </TabPanel>
  )
}

export default MonthlyPanel
