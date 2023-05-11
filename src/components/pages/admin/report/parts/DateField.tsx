import ja from 'date-fns/locale/ja'
import React from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export type Props = {
  date: Date
  onChangeDate: (value: Date) => void
}

function DateField({ date, onChangeDate }: Props) {
  registerLocale('ja', ja)

  return (
    <div>
      <ReactDatePicker
        className='max-w-[7rem] rounded border-2 p-3 text-lg'
        dateFormat='yyyy/MMMM'
        locale='ja'
        onChange={(value) => onChangeDate(value as Date)}
        selected={date}
        showMonthYearPicker
      />
    </div>
  )
}

export default DateField
