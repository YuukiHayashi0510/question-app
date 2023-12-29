import ja from 'date-fns/locale/ja'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import { Control, Controller } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  control: Control<any>
  name: string
}

function DateField(props: Props) {
  registerLocale('ja', ja)
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value } }) => (
        <ReactDatePicker
          className='w-full rounded border-2 p-2 text-lg'
          dateFormat='yyyy/MM/dd'
          locale='ja'
          onChange={onChange}
          selected={value as Date}
        />
      )}
    />
  )
}

export default DateField
