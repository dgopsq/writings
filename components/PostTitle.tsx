import { formatDate } from '../utils/formats'
import { colors, getHeaderFontFamily } from '../theme'
import { DevToLink } from './DevToLink'

type Props = {
  value: string
  date: Date
  big?: boolean
  tags?: Array<string>
  devToId?: string
}

const PostTitle: React.FC<Props> = ({ value, date, big, tags, devToId }) => {
  const postDate = formatDate(date)

  return (
    <>
      <div>
        <div>
          {big ? (
            <h1 className='post-title'>{value}</h1>
          ) : (
            <h2 className='post-title'>{value}</h2>
          )}
        </div>

        {tags ? (
          <div className={`post-tags ${big ? 'big' : ''}`}>
            {tags.map((tag, index) => (
              <span key={`${tag}-${index}`} className='post-tag'>
                {tag}
              </span>
            ))}
          </div>
        ) : undefined}

        <div className='post-meta-wrapper'>
          <time
            className={`post-date ${big ? 'big' : ''}`}
            dateTime={date.toISOString()}
          >
            {postDate}
          </time>

          {typeof devToId !== 'undefined' ? (
            <div className='post-devto'>
              <DevToLink id={devToId} />
            </div>
          ) : undefined}
        </div>
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
          line-height: 1.4;
        }

        h1.post-title {
          font-size: 2.6em;
        }

        h2.post-title {
          font-size: 1.6em;
        }

        .post-meta-wrapper {
          margin-top: 1em;

          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .post-date {
          color: ${colors.silver};
          font-size: 0.75em;
          font-family: ${getHeaderFontFamily()};
        }

        .post-devto {
          margin-left: 1em;
          font-size: 0.9em;
          font-family: ${getHeaderFontFamily()};
        }

        .post-date.big {
          font-size: 1em;
        }

        .post-tags {
          margin-top: 0.8em;
          display: flex;
          flex-direction: row;
        }

        .post-tags.big {
          margin-top: 0.9em;
        }

        .post-tag {
          font-size: 0.6em;
          padding: 0.2em 0.5em;
          color: ${colors.primary};
          font-family: ${getHeaderFontFamily()};
          background-color: ${colors.lightGrey};
          border-radius: 0.3em;

          margin-right: 0.5em;
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
