import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import { Control, FieldErrorsImpl } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Report } from '~/types/pages/report'

import Item from './Item'

export type Props = {
  control: Control<Report>
  sectionName: string
  errors: Partial<FieldErrorsImpl<Report>>
}

function Section(props: Props) {
  const sectionName = props.sectionName
  const [t] = useTranslation()

  return (
    <div className='my-6'>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component='h6' variant='h6'>
            {t(`Report.${sectionName}.name`)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Item {...props} />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Section
