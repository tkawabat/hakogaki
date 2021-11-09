import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Chip, Tooltip } from '@mui/material/'

import { RootState } from 'src/store/rootReducer'
import ScenarioSlice from '../../store/ScenarioSlice'

import * as C from '../../lib/Const'

const Main = styled(Chip)`
    display: flex;
    align-self: center;
    font-weight: 600;
    margin-right: 5px;
`

type Props = {}

const App = (props: Props) => {
    const dispatch = useDispatch()
    const mode = useSelector((state: RootState) => state.scenario.config.mode)
    const color = mode == C.ScenarioConfigMode.PLOT ? 'secondary' : 'primary'

    const onClick = () => {
        const newMode = mode == C.ScenarioConfigMode.PLOT
            ? C.ScenarioConfigMode.SCENARIO
            : C.ScenarioConfigMode.PLOT
        dispatch(ScenarioSlice.actions.changeScenarioConfigMode({
            mode: newMode,
        }))
    }

    const text = mode == C.ScenarioConfigMode.PLOT
        ? C.ScenarioConfigMode.PLOT
        : C.ScenarioConfigMode.SCENARIO

    return (
        <Tooltip title={'入力モードを切替'}>
            <Main label={text} onClick={onClick} color={color} {...props} />
        </Tooltip>
    )
}

export default App
