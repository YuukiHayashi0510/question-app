import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import { Control, FieldErrorsImpl } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import NumberController from '~/components/base/FormField/NumberController'
import TextController from '~/components/base/FormField/TextController'
import { Report } from '~/types/pages/report'

type Props = {
  control: Control<Report>
  errors: Partial<FieldErrorsImpl<Report>>
}

function Mtg(props: Props) {
  const [t] = useTranslation()

  return (
    <div className='my-6'>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component='h6' variant='h6'>
            {t(`Report.mtg`)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className='flex gap-4'>
            <div className='w-1/5'>
              <NumberController
                control={props.control}
                label={t('Section.time')}
                name={`mtg.time`}
              />
            </div>
            <div className='w-4/5'>
              <TextController
                control={props.control}
                label={t('Section.memo')}
                multiline
                name={`mtg.memo`}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Mtg
