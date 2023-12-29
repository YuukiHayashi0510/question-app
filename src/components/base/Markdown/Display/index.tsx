import hljs from 'highlight.js'
import { marked } from 'marked'
import React from 'react'
import 'highlight.js/styles/atom-one-dark.css'

type Props = {
  text: string
}

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: function (code) {
    return hljs.highlightAuto(code, ['html', 'javascript', 'python']).value
  },
})

function DisplayMd({ text }: Props) {
  return (
    <div className='markdown'>
      <span
        dangerouslySetInnerHTML={{
          __html: marked(text),
        }}
      />
    </div>
  )
}

export default DisplayMd
