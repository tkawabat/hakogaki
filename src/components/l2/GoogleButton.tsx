import React from 'react'
import { useSession } from "next-auth/react"

import GoogleLoginButton from '../l1/GoogleLoginButton'
import GoogleUserButton from '../l1/GoogleUserButton'
import GoogleDriveApiDao from 'src/dao/GoogleDriveApiDao'

const App = () => {
    const { data: session } = useSession()

    const isLogin = session && session.accessToken
    if (isLogin) GoogleDriveApiDao.setToken(session.accessToken!)

    return !isLogin ? (
        <GoogleLoginButton />
    ) : (
        <GoogleUserButton session={session} />
    )
}

export default App
