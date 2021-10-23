import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { IconButton, Tooltip } from '@mui/material/'
import { Delete } from '@mui/icons-material/'

import ScenarioSlice from '../../store/ScenarioSlice'

const Root = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    width: 40px;
`

const App = () => {
    const dispatch = useDispatch()

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (confirm('シナリオを全削除します。よろしいですか？')) {
            dispatch(ScenarioSlice.actions.deleteScenario())
        }
    }

    return (
        <Root>
            <Tooltip title="シナリオを削除" arrow>
                <IconButton size={'small'} onClick={onClick}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </Root>
    )
}

export default App
