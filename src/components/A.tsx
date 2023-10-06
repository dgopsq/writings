import { AnchorHTMLAttributes, PropsWithChildren } from 'react'

type Props = PropsWithChildren<
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'>
>

/**
 * A simple Anchor component.
 */
export const A: React.FC<Props> = ({ children, ...rest }) => (
  <a rel='noopener noreferrer' target='_blank' {...rest}>
    {children}
  </a>
)
