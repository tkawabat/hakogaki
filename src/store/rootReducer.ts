import { combineReducers } from '@reduxjs/toolkit'

import ScenarioSlice from './ScenarioSlice'
import GoogleSlice from './GoogleSlice'

const rootReducer = combineReducers({
    scenario: ScenarioSlice.reducer,
    google: GoogleSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
