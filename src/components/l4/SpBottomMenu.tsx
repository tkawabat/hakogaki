import { SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { BottomNavigation, BottomNavigationAction } from '@mui/material/'

import { pc } from '../../lib/Responsive'
import * as C from '../../lib/Const'

import { RootState } from 'src/store/rootReducer'
import ScenarioSlice from '../../store/ScenarioSlice'

const style = {
    backgroundColor: '#d7e6efca',
    width: '100%',
}

const Main = styled.div`
    ${pc`
        display: none;
    `}
    display: flex;

    align-items: center;
    width: 100%;
    height: 40px;
`

export default function App() {
    const dispatch = useDispatch()
    const mode = useSelector((state: RootState) => state.scenario.config.mode)

    const onChange = (event: SyntheticEvent<Element, Event>, value: number) => {
        dispatch(ScenarioSlice.actions.changeScenarioConfigMode({
            mode: modeList[value],
        }))
    }

    // 切り替えの順番を定義
    const modeList = [
        C.ScenarioConfigMode.SMARTPHONE_SCENARIO_MEMO,
        C.ScenarioConfigMode.SMARTPHONE_SCENARIO,
        C.ScenarioConfigMode.SMARTPHONE_MEMO,
    ]

    const value = modeList.indexOf(mode) != -1 ?
        modeList.indexOf(mode) : 1

    return (
        <Main>
            <BottomNavigation
                showLabels
                value={value}
                onChange={onChange}
                sx={style}    
            >
                <BottomNavigationAction label="全体メモ" />
                <BottomNavigationAction label="本文" />
                <BottomNavigationAction label="段落メモ" />
            </BottomNavigation>
        </Main>
    )
}
