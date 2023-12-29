import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'
import TrendingFlatOutlinedIcon from '@mui/icons-material/TrendingFlatOutlined'
import { Chip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { State } from '~/types/pages/form/const'
import { getChipColor, getEngLabel } from './utils'

type Props = {
  label: State
}

function ProgressChip({ label }: Props) {
  const [, i18n] = useTranslation()
  const color = getChipColor(label)
  const enLabel = getEngLabel(i18n.language, label)

  let icon = <CheckCircleOutlinedIcon />
  switch (label) {
    case State.Yet:
      icon = <PendingOutlinedIcon />
      break
    case State.Doing:
      icon = <TrendingFlatOutlinedIcon />
      break
    case State.Done:
      icon = <CheckCircleOutlinedIcon />
      break
    // enumで存在しないもの・新しいものの追加忘れを弾くときに使える
    default: {
      const wrongLabel: never = label
      throw new Error(`${wrongLabel} is not in State`)
    }
  }

  return (
    <div className='my-2'>
      <Chip
        className='w-min'
        color={color}
        icon={icon}
        label={enLabel ? enLabel : label}
      />
    </div>
  )
}

export default ProgressChip
