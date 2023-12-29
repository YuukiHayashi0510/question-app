import CodeBlock from '~/components/base/Markdown/CodeBlock'

type Props = {
  code: string
  lang: string
  text: string
}

function DetailCodeBlock(props: Props) {
  return (
    <>
      {props.code ? (
        <div className='my-2 rounded border-2 p-2'>
          <p className='font-medium'>{props.text + props.lang}</p>
          <CodeBlock language={props.lang} value={props.code} />
        </div>
      ) : null}
    </>
  )
}

export default DetailCodeBlock
