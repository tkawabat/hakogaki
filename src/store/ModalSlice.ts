import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as C from '../lib/Const'

export interface ModalModel {
    autoSaveCation: boolean
}

export interface SetPayload {
    open: boolean
}

const initialState: ModalModel = {
    autoSaveCation: true,
}

const slice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setAutoSaveCation: (state, action: PayloadAction<SetPayload>) => {
            state.autoSaveCation = action.payload.open;
        },
    },
})

export default slice
