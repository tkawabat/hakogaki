import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as C from '../lib/Const'

export interface GoogleModel {
    email: string
    imageUrl: string
}

const initialState: GoogleModel = {
    email: '',
    imageUrl: '',
}

const slice = createSlice({
    name: 'google',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<GoogleModel>) => {
            state.email = action.payload.email
            state.imageUrl = action.payload.imageUrl
        },

        logout: (state) => {
            state.email = ''
            state.imageUrl = ''
        },
    },
})

export default slice
