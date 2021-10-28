import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as C from '../lib/Const'

export interface ModalModel {
    autoSaveCation: boolean
    driveList: boolean
}

export interface SetPayload {
    open: boolean
}

const initialState: ModalModel = {
    autoSaveCation: true,
    driveList: false,
}

const slice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setAutoSaveCation: (state, action: PayloadAction<SetPayload>) => {
            state.autoSaveCation = action.payload.open;
        },
        setDriveList: (state, action: PayloadAction<SetPayload>) => {
            state.driveList = action.payload.open;
        },
    },
})

export default slice
