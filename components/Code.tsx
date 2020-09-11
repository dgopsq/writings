import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/nord'

SyntaxHighlighter.registerLanguage('typescript', typescript)

type Props = {
  value: string
}

const Code: React.SFC<Props> = ({ value }) => {
  return (
    <SyntaxHighlighter language='typescript' style={theme}>
      {value}
    </SyntaxHighlighter>
  )
}

export default Code
