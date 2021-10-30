import { combineReducers } from '@reduxjs/toolkit'

import ScenarioSlice from './ScenarioSlice'
import ModalSlice from './ModalSlice'
import GoogleSlice from './GoogleSlice'
import DriveListSlice from './DriveListSlice'

const rootReducer = combineReducers({
    scenario: ScenarioSlice.reducer,
    modal: ModalSlice.reducer,
    google: GoogleSlice.reducer,
    driveList: DriveListSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
