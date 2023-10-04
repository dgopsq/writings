import { Logo } from '../../../components/Logo'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Logo />
      </div>

      <div className='mt-12'>{children}</div>
    </>
  )
}
