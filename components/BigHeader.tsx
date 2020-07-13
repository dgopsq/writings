import React from 'react'
import { colors } from '../theme'
import Layout from './Layout'

const BigHeader: React.SFC = () => {
  return (
    <>
      <div className='wrapper'>
        <Layout>
          <h1>Diego Pasquali</h1>
          <h2>DGOPSQ</h2>
          <h3>Frontend engineer and tech enthusiast</h3>
        </Layout>
      </div>

      <style jsx>{`
        .wrapper {
          width: 100%;
          height: 98vh;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          background-color: ${colors.primary};
        }

        .wrapper h1,
        .wrapper h2,
        .wrapper h3 {
          text-align: center;
          margin: 0em;
          color: ${colors.mainText};
          line-height: 1;
        }

        .wrapper h1 {
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.2em;
          font-size: 1.7em;
        }

        .wrapper h2 {
          margin-top: 0.3em;

          font-family: 'Abril Fatface', cursive;
          letter-spacing: 0.1em;
          font-size: 8em;
        }

        .wrapper h3 {
          margin-top: 3em;

          font-weight: 400;
          letter-spacing: 0.01em;
          font-size: 1.4em;
        }
      `}</style>
    </>
  )
}

export default BigHeader
