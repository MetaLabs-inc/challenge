import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const AuthBanner: React.FC = () => {
  const { data: session } = useSession()

  if (session) {
    return <p>
      Signed in as {session.user?.email} (<a onClick={() => signOut()} className='underline text-sky-500 cursor-pointer'>Sign out</a>)
    </p>
  }

  return <p>
    Not signed in (<a onClick={() => signIn()} className='underline text-sky-500 cursor-pointer'>Sign in</a>)
  </p>
}

export default AuthBanner
