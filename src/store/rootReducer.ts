import { combineReducers } from '@reduxjs/toolkit'

import ScenarioSlice from './ScenarioSlice';

const rootReducer = combineReducers({
    scenario: ScenarioSlice.reducer,
})
 
export type RootState = ReturnType<typeof rootReducer>
 
export default rootReducer;