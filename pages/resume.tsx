import dynamic from 'next/dynamic'

const ResumeWeb = dynamic(
  () => import('../components/Resume').then(({ ResumeWeb }) => ResumeWeb),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
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
    `}</style>
  </>
)
