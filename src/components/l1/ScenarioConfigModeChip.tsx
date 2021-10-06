import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Chip, Tooltip, } from '@mui/material/'

import { RootState } from 'src/store/rootReducer'
import ScenarioSlice, { ScenarioConfigModePayload } from '../../store/ScenarioSlice'

import * as C from '../../lib/Const'


const Main = styled(Chip)`
    display: flex;
    align-self: center;
    font-weight: 600;
    margin-right: 5px;
`

type Props = {
}

const App = (props: Props) => {
    const dispatch = useDispatch()
    const mode = useSelector((state: RootState) => state.scenario.config.mode)
    const color = mode == C.ScenarioConfigMode.SCENARIO
        ? 'primary'
        : 'secondary'

    const onClick = () => {
        const newMode = mode == C.ScenarioConfigMode.SCENARIO
            ? C.ScenarioConfigMode.PLOT
            : C.ScenarioConfigMode.SCENARIO

        const payload: ScenarioConfigModePayload = {
            mode: newMode
        }
        dispatch(ScenarioSlice.actions.changeScenarioConfigMode(payload))
    }

    return (
        <Tooltip title={'入力モードを切替'}>
            <Main
                label={mode}
                onClick={onClick}
                color={color}
                {...props}
            />
        </Tooltip>
    )
}

export default App
