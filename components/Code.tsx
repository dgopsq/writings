import { CodeComponent } from 'react-markdown/src/ast-to-react'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/nord'

SyntaxHighlighter.registerLanguage('typescript', typescript)

const Code: CodeComponent = (props) => {
  const { children, inline, className, ...rest } = props
  const match = /language-(\w+)/.exec(className || '')

  if (!inline && match)
    return (
      <SyntaxHighlighter language='typescript' style={theme}>
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
