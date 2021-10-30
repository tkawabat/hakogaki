import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store/rootReducer'
import { GoogleModel } from '../../store/GoogleSlice'

import GoogleLoginButton from '../l1/GoogleLoginButton'
import GoogleUserButton from '../l1/GoogleUserButton'

const App = () => {
    const googleModel: GoogleModel = useSelector((state: RootState) => state.google)

    return googleModel.email == '' ? (
        <GoogleLoginButton />
    ) : (
        <GoogleUserButton googleModel={googleModel} />
    )
}

export default App
