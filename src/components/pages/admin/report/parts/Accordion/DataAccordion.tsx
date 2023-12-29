import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import React from 'react'
import TotalTable from './TotalTable'
import type { Report } from '~/types/pages/report'

type Props = {
  name: string
  report: Report[]
}

function DataAccordion({ name, report }: Props) {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {name}
        </AccordionSummary>
        <AccordionDetails className='flex flex-col gap-4'>
          <TotalTable report={report} />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default DataAccordion
