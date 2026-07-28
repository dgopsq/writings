import { siDevdotto, siGithub, siX } from 'simple-icons'
import { match } from 'ts-pattern'

const baseIconSize = 25

/**
 * simple-icons dropped the LinkedIn glyph, so it is inlined here. This is the
 * path shipped as `siLinkedin` in simple-icons 9.21.0, the last version we
 * used that still carried it.
 */
const linkedInPath =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

type Props = {
  url: string
  kind: 'X' | 'GitHub' | 'LinkedIn' | 'Dev.to'
}

export const SocialIcon: React.FC<Props> = ({ url, kind }) => {
  const svgPath = match(kind)
    .with('X', () => siX.path)
    .with('GitHub', () => siGithub.path)
    .with('LinkedIn', () => linkedInPath)
    .with('Dev.to', () => siDevdotto.path)
    .exhaustive()

  return (
    <a
      href={url}
      target='_blank'
      className='p-2 border border-gray-100 rounded-md text-gray-400 hover:border-gray-200 hover:text-gray-600 transition-colors ease-in-out'
      rel='noreferrer noopener'
    >
      <svg
        width={baseIconSize}
        height={baseIconSize}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        role='img'
      >
        <title>{kind}</title>
        <path d={svgPath} fill='currentColor' />
      </svg>
    </a>
  )
}
