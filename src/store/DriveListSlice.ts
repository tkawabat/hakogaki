import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as C from '../lib/Const'

import ModalListItemModel from './model/DriveListItemModel'

export interface DriveListModel {
    items: ModalListItemModel[]
}

const initialState: DriveListModel = {
    items: [],
}

const slice = createSlice({
    name: 'driveList',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<DriveListModel>) => {
            state.items = action.payload.items;
        },
        
    },
})

export default slice
