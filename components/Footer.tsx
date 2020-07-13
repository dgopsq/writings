import React from 'react'
import { colors } from '../theme'

const Footer: React.SFC = () => {
  return (
    <>
      <div className='wrapper'>
        <div>
          <a href='mailto:hello@dgopsq.space' className='social'>
            Email
          </a>

          <a href='https://twitter.com/dgopsq' className='social'>
            Twitter
          </a>

          <a href='https://github.com/dgopsq' className='social'>
            Github
          </a>
        </div>

        <div>
          <div className='copyright'>© 2020 Diego Pasquali</div>
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .social {
          text-transform: uppercase;
          color: ${colors.primary};
          font-size: 0.8em;
          text-decoration: none;
        }

        .social:hover {
          text-decoration: underline;
        }

        .social + .social {
          margin-left: 1.5em;
        }

        .copyright {
          font-size: 0.8em;
          color: rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </>
  )
}

export default Footer
