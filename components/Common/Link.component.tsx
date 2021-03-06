import { default as NextLink } from 'next/link'
import { ReactNode } from 'react'

const Link = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <NextLink href={href} passHref>
      <div className="cursor-pointer select-none font-inter text-[14px] font-medium no-underline">
        {children}
      </div>
    </NextLink>
  )
}

export default Link
