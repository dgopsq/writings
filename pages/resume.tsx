import dynamic from 'next/dynamic'

const ResumeWeb = dynamic(
  () => import('../components/Resume').then(({ ResumeWeb }) => ResumeWeb),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
)

export default () => <ResumeWeb />
