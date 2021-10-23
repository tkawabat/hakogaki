import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../store/rootReducer'
import { GoogleModel } from '../../store/GoogleSlice'

import GoogleUtil from '../../lib/GoogleUtil'

import GoogleLoginButton from '../l1/GoogleLoginButton'
import GoogleUserButton from '../l1/GoogleUserButton'

const Root = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`

const App = () => {
    const googleModel: GoogleModel = useSelector(
        (state: RootState) => state.google
    )

    return (googleModel.email == '' ?
        <GoogleLoginButton /> : <GoogleUserButton imageUrl={googleModel.imageUrl} />
    )
}

export default App
