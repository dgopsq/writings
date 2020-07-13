import React from 'react'
import { colors } from '../theme'

const Posts: React.SFC = () => {
  return (
    <>
      <div className='wrapper'>
        <div className='fallback'>
          <div className='icon'>👨‍💻</div>
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          text-align: center;
        }

        .fallback .icon {
          font-size: 2em;
        }
      `}</style>
    </>
  )
}

export default Posts
