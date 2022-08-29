import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { TypographyStyle } from 'react-typography'
import { typography } from '../theme'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  componentDidMount() {
    // Typography.js
    typography.injectStyles()
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='icon'
            href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>'
          />

          <link
            href='https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Open+Sans:wght@400;700&display=swap'
            rel='stylesheet'
          />

          <style>{`
          html,
          body {
            padding: 0em;
            margin: 0em;
          }

          @media all and (max-width: 42em) {
            body {
              font-size: 90%;
            }
          }
        `}</style>

          <TypographyStyle typography={typography} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
