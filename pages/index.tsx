import { signOut } from 'next-auth/react'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (
    <div className="h-screen bg-ererieblack">
      <button className="bg-schoolbusyellow" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  )
}

Home.auth = true

export default Home
