import dynamic from 'next/dynamic'
import FadeLoader from 'react-spinners/FadeLoader'
import { colors } from '../theme'

const ResumeWeb = dynamic(
  () => import('../components/Resume').then(({ ResumeWeb }) => ResumeWeb),
  {
    ssr: false,
    loading: () => (
      <div className='loader-wrapper'>
        <FadeLoader color={colors.primary} height={13} width={4} margin={1} />
      </div>
    ),
  },
)

export default () => (
  <>
    <ResumeWeb />

    <style global jsx>{`
      body,
      html {
        overflow: hidden !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      .loader-wrapper {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </>
)
