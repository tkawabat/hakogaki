import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { IconButton, Tooltip } from '@mui/material/'
import { Add } from '@mui/icons-material/'

import ScenarioSlice from '../../store/ScenarioSlice'

type Props = {}

const Main = styled(IconButton)``

const App = (props: Props) => {
    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(ScenarioSlice.actions.addParagraph())
    }

    return (
        <Tooltip title="段落を追加" arrow>
            <Main onClick={onClick}>
                <Add />
            </Main>
        </Tooltip>
    )
}

export default App
