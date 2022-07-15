type Props = {
  children: React.ReactNode
}

const Layout = (props: Props) => {
  return (
    <>
      <div className='wrapper'>{props.children}</div>

      <style jsx>{`
        .wrapper {
          max-width: 53em;
          margin: 0 auto;
          padding: 0em 2em;
        }
      `}</style>
    </>
  )
}

export default Layout
