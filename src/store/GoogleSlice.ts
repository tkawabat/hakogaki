import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as C from '../lib/Const'


export interface GoogleModel {
    accessToken: string;
    email: string;
    imageUrl: string;
}

export interface LoadPayload {
}

const initialState: GoogleModel = {
    accessToken: '',
    email: '',
    imageUrl: '',
}

const slice = createSlice({
    name: 'google',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<GoogleModel>) => {
            state.accessToken = action.payload.accessToken;
            state.email = action.payload.email;
            state.imageUrl = action.payload.imageUrl;
        },

        logout: (state) => {
            state.accessToken = '';
            state.email = '';
            state.imageUrl = '';
        },
    },
})

export default slice
