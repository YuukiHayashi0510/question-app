import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Control, Controller, UseFormWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import CodeBlock from '~/components/base/Markdown/CodeBlock'
import { Form } from '~/types/pages/form'

type Props = {
  code: 'code' | 'code2'
  lang: 'lang' | 'lang2'
  control: Control<Form>
  watch: UseFormWatch<Form>
}

function Preview(props: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const codeValue = props.watch(props.code)
  const [t] = useTranslation()

  useEffect(() => {
    setIsOpen(codeValue.length > 0)
  }, [codeValue])

  const onClickPreview = () => setIsOpen((prev) => !prev)

  return (
    <div>
      <Button onClick={onClickPreview} variant='outlined'>
        {isOpen ? t('Button.closePreview') : t('Button.openPreview')}
      </Button>
      {isOpen ? (
        <div className='my-2 w-min'>
          <Controller
            control={props.control}
            name={props.code}
            render={() => (
              <CodeBlock language={props.watch(props.lang)} value={codeValue} />
            )}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Preview
