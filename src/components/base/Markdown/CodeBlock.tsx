import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import materialDark from 'react-syntax-highlighter/dist/cjs/styles/prism/material-dark'

type Props = {
  language: string
  value: string
}

function CodeBlock(props: Props) {
  return (
    <SyntaxHighlighter language={props.language} style={materialDark}>
      {props.value}
    </SyntaxHighlighter>
  )
}
export default CodeBlock
