import { colors } from '../theme'

export default function Home() {
  return (
    <>
      <div className='main'>
        <h1>Diego Pasquali</h1>
        <h2>DGOPSQ</h2>
        <h3>Frontend engineer and tech enthusiast</h3>
      </div>

      <style jsx>{`
        .main {
          width: 100%;
          height: 98vh;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          background-color: ${colors.primary};
        }

        .main h1,
        .main h2,
        .main h3 {
          margin: 0em;
          color: ${colors.mainText};
          line-height: 1;
        }

        .main h1 {
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.2em;
          font-size: 1.7em;
        }

        .main h2 {
          margin-top: 0.3em;

          font-family: 'Abril Fatface', cursive;
          letter-spacing: 0.1em;
          font-size: 8em;
        }

        .main h3 {
          margin-top: 3em;

          font-weight: 400;
          letter-spacing: 0.01em;
          font-size: 1.4em;
        }
      `}</style>
    </>
  )
}
