import React from 'react'
import { colors } from '../theme'
import Layout from './Layout'
import Link from 'next/link'

const SmallHeader: React.SFC = () => {
  return (
    <>
      <div className='wrapper'>
        <Layout>
          <Link href='/'>
            <a>
              <span>DGOPSQ</span>
            </a>
          </Link>
        </Layout>
      </div>

      <style jsx>{`
        .wrapper {
          width: 100%;
          background-color: ${colors.primary};
        }

        .wrapper a {
          text-decoration: none;
        }

        .wrapper span {
          display: block;

          margin: 0em;
          padding: 1em;

          text-align: center;
          color: ${colors.mainText};
          line-height: 1;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.2em;
          font-size: 1.5em;
          font-family: 'Abril Fatface', cursive;
        }
      `}</style>
    </>
  )
}

export default SmallHeader
