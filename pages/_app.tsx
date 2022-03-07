import { NextPage } from 'next'
import { SessionProvider, useSession } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode } from 'react'
import '../styles/globals.css'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
  auth: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth ? (
        <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
      ) : (
        getLayout(<Component {...pageProps} />)
      )}
    </SessionProvider>
  )
}

const Auth = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      push('/auth/login')
    },
  })

  if (!!session?.user) {
    return <>{children}</>
  }

  console.log('show that loading')

  return <>Loading Pageeee</>
}

export default App
