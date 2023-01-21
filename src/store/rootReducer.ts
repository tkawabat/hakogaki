import { combineReducers } from '@reduxjs/toolkit'

import ScenarioSlice from './ScenarioSlice'
import ModalSlice from './ModalSlice'
import DriveListSlice from './DriveListSlice'

const rootReducer = combineReducers({
    scenario: ScenarioSlice.reducer,
    modal: ModalSlice.reducer,
    driveList: DriveListSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
