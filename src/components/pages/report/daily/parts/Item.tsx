import { Chip } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

import NumberController from '~/components/base/FormField/NumberController'
import TextController from '~/components/base/FormField/TextController'

import { contentsKey } from '~/types/pages/report/const'
import { Props as SectionProps } from './Section'

type Props = SectionProps

function Item(props: Props) {
  const selectKey = (name: string) => {
    let key: string[] = []

    switch (name) {
      case 'con':
        key = contentsKey
        break
    }

    return key
  }

  const [t] = useTranslation()

  return (
    <>
      {selectKey(props.sectionName).map((v, i) => {
        if (v === 'mtg') return
        return (
          <div key={i}>
            <Chip
              className='my-2'
              color='info'
              label={t(`Report.${props.sectionName}.${v}`)}
              variant='outlined'
            />
            <div className='flex gap-4'>
              <div className='w-1/5'>
                <NumberController
                  control={props.control}
                  label={t('Section.time')}
                  name={`${props.sectionName}.${v}.time`}
                />
              </div>
              <div className='w-4/5'>
                <TextController
                  control={props.control}
                  label={t('Section.memo')}
                  multiline
                  name={`${props.sectionName}.${v}.memo`}
                />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Item
