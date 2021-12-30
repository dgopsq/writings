import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import objectivec from 'react-syntax-highlighter/dist/cjs/languages/prism/objectivec'
import purescript from 'react-syntax-highlighter/dist/cjs/languages/prism/purescript'
import haskell from 'react-syntax-highlighter/dist/cjs/languages/prism/haskell'
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/nord'
import { CodeComponent } from 'react-markdown/lib/ast-to-react'

SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('objectivec', objectivec)
SyntaxHighlighter.registerLanguage('purescript', purescript)
SyntaxHighlighter.registerLanguage('haskell', haskell)

const Code: CodeComponent = (props) => {
  const { children, inline, className, ...rest } = props
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : undefined

  if (!inline && match)
    return (
      <SyntaxHighlighter language={language} style={theme}>
        {children}
      </SyntaxHighlighter>
    )
  else
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    )
}

export default Code
