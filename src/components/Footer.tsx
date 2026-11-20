import { SocialIcon } from './SocialIcon'

/**
 * The generic app footer.
 */
export const Footer = () => (
  <footer className='flex flex-row gap-6'>
    <SocialIcon kind='X' url='https://x.com/imdixpas' />
    <SocialIcon kind='GitHub' url='https://github.com/dgopsq' />
    <SocialIcon kind='LinkedIn' url='https://www.linkedin.com/in/dixpas/' />
    <SocialIcon kind='Dev.to' url='https://dev.to/dixpas' />
  </footer>
)
