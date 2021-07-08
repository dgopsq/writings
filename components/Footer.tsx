import { colors, typography, getHeaderFontFamily } from '../theme'
import Layout from './Layout'

const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <>
      <div className='wrapper'>
        <Layout>
          <div className='flex'>
            <div className='flex-item'>
              <a
                href='https://www.linkedin.com/in/dgopsq/'
                target='_blank'
                rel='noopener'
                className='social'
              >
                LinkedIn
              </a>

              <a
                href='https://twitter.com/dgopsq'
                target='_blank'
                rel='noopener'
                className='social'
              >
                Twitter
              </a>

              <a
                href='https://github.com/dgopsq'
                target='_blank'
                rel='noopener'
                className='social'
              >
                Github
              </a>
            </div>

            <div className='flex-item'>
              <div className='copyright'>© {year} Diego Pasquali</div>
            </div>
          </div>
        </Layout>
      </div>

      <style jsx>{`
        .wrapper {
          padding: 2em 0em;
          background: ${colors.lightGrey};

          font-family: ${getHeaderFontFamily()};
        }

        .flex {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }

        .flex-item {
          text-align: center;
        }

        .social {
          text-transform: uppercase;
          color: ${colors.primary};
          font-size: 0.7em;
          text-decoration: none;
        }

        .social:hover {
          text-decoration: underline;
        }

        .social + .social {
          margin-left: 1.5em;
        }

        .copyright {
          font-size: 0.7em;
          color: rgba(0, 0, 0, 0.8);
        }

        @media all and (max-width: 42em) {
          .flex-item {
            flex-basis: 100%;
          }

          .flex-item:not(:first-child) {
            margin-top: 1em;
          }
        }
      `}</style>
    </>
  )
}

export default Footer
