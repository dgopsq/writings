import ReactMarkdown from 'react-markdown'
import remarkHint from 'remark-hint'
import rehypeExternalLink from 'rehype-external-links'
import { typography, colors } from '../theme'
import Code from './Code'

type Props = {
  source: string
}

const Markdown: React.FC<Props> = ({ source }) => {
  return (
    <>
      <ReactMarkdown
        components={{ code: Code }}
        remarkPlugins={[remarkHint]}
        rehypePlugins={[rehypeExternalLink]}
        children={source}
      />

      <style global jsx>{`
        a,
        a:link,
        a:visited {
          color: ${colors.primary};
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        pre,
        code {
          font-variant-ligatures: none;
        }

        code {
          font-family: 'Source Code Pro', monospace !important;
          font-size: 0.8em !important;

          background-color: ${colors.lightGrey};
          padding: 0.3em;
          border-radius: 0.2em;
          color: ${colors.primary};
        }

        pre {
          font-family: 'Source Code Pro', monospace !important;
          font-size: 0.95em !important;

          margin-top: ${typography.rhythm(1)} !important;
          margin-bottom: ${typography.rhythm(1)} !important;
        }

        blockquote,
        .hint {
          padding: 1em;
          margin-left: 0em;
          margin-right: 0em;
        }

        blockquote,
        .hint.tip {
          background-color: ${colors.lightPrimary};
          border-radius: 0.25em;
          border-top-left-radius: 0em;
          border-bottom-left-radius: 0em;
          border-left: 4px solid ${colors.primary};
        }
      `}</style>
    </>
  )
}

export default Markdown
