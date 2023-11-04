import { PropsWithChildren } from 'react'

/**
 * The title of a section.
 */
export const SectionTitle: React.FC<PropsWithChildren> = ({ children }) => (
  <h2 className='font-semibold text-gray-400 uppercase tracking-widest'>
    {children}
  </h2>
)
