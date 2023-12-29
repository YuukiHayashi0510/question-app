import { DateLocale } from '~/helpers/date/locale'
import { Report } from '~/types/pages/report'
import PieChart from './PieChart'
import DailyTable from './Table'
import TabPanel from '../../Tabs/TabPanel'

type Props = {
  date: Date
  report?: Report
}

function DailyPanel({ date, report }: Props) {
  const dateStr = DateLocale.translateShortJapanese(date)

  return (
    <TabPanel index={0}>
      {report ? (
        <>
          <p className='text-lg font-bold'>{dateStr}</p>
          <div className='flex justify-between'>
            <div className='flex w-2/5 flex-col'>
              <DailyTable label='Con' section={report.con} />
              <div className='flex'>
                <p className='w-2/3 border text-center'>MTG</p>
                <p className='w-1/3 border text-center'>{report.mtg.time}h</p>
              </div>
              <div className='border p-2'>
                <p className='font-medium'>Memo</p>
                <p className='text-gray-500'>{report.mtg.memo}</p>
              </div>
            </div>
            <div className='w-2/5'>
              <p className='text-center'>所要時間の割合</p>
              <PieChart report={report} />
            </div>
          </div>
        </>
      ) : (
        <p>日報がありません</p>
      )}
    </TabPanel>
  )
}

export default DailyPanel
