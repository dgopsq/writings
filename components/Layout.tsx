import React from 'react'

const Layout: React.SFC = (props) => {
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
