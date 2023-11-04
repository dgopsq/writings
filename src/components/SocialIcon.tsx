import Link from 'next/link'
import { siX, siGithub, siLinkedin, siDevdotto } from 'simple-icons'
import { match } from 'ts-pattern'

const baseIconSize = 25

type Props = {
  url: string
  kind: 'X' | 'GitHub' | 'LinkedIn' | 'Dev.to'
}

export const SocialIcon: React.FC<Props> = ({ url, kind }) => {
  const svgPath = match(kind)
    .with('X', () => siX.path)
    .with('GitHub', () => siGithub.path)
    .with('LinkedIn', () => siLinkedin.path)
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
      >
        <path d={svgPath} fill='currentColor' />
      </svg>
    </a>
  )
}
