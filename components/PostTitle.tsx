import { formatDate } from '../utils/formats'
import { colors, getHeaderFontFamily } from '../theme'

type Props = {
  value: string
  date: Date
  big?: boolean
}

const PostTitle: React.FC<Props> = ({ value, date, big }) => {
  const postDate = formatDate(date)

  return (
    <>
      <div>
        {big ? (
          <h1 className='post-title'>{value}</h1>
        ) : (
          <h2 className='post-title'>{value}</h2>
        )}

        <time
          className={`post-date ${big ? 'big' : ''}`}
          dateTime={date.toISOString()}
        >
          {postDate}
        </time>
      </div>

      <style jsx>{`
        .post-title,
        .post-date {
          display: block;
          margin: 0;
        }

        .post-title {
          color: ${colors.primary};
          font-weight: bolder;
          line-height: 1.3;
        }

        h1.post-title {
          font-size: 2.6em;
        }

        h2.post-title {
          font-size: 1.6em;
        }

        .post-date {
          color: ${colors.silver};
          font-size: 0.75em;
          font-family: ${getHeaderFontFamily()};

          margin-top: 0.7em;
        }

        .post-date.big {
          font-size: 1em;
        }

        @media all and (max-width: 42em) {
          h1.post-title {
            font-size: 2em;
          }

          .post-date.big {
            font-size: 0.9em;
          }
        }
      `}</style>
    </>
  )
}

export default PostTitle
