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
    <div className='container'>
      <ResumeWeb />
    </div>

    <style jsx>{`
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </>
)
