import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { RootState } from 'src/store/rootReducer'

import * as C from '../../lib/Const'

import GoogleButton from '../l2/GoogleButton'
import Center from '../l1/Center'
import Left from '../l1/Left'
import Right from '../l1/Right'
import ScenarioConfigModeChip from '../l1/ScenarioConfigModeChip'
import DeleteScenarioButton from '../l1/DeleteScenarioButton'
import FileButton from '../l1/FileButton'
import HelpButton from '../l1/HelpButton'
import ScenarioTitle from '../l1/ScenarioTitle'

const Root = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    background-color: #d7e6ef;
`

const ToolTitle = styled.span`
    font-family: 'Helvetica Neue', 'Helvetica', 'Hiragino Sans',
        'Hiragino Kaku Gothic ProN', 'Arial', 'Yu Gothic', 'Meiryo', sans-serif;
    font-size: 20px;
    font-weight: bold;
`

const StyledLeft = styled(Left)`
    padding-left: 20px;
`

const StyledRight = styled(Right)`
    padding-right: 20px;
`

const App = () => {
    const title = useSelector((state: RootState) => state.scenario.title)

    return (
        <Root className="header">
            <StyledLeft>
                <ToolTitle>{C.AppNameShort}</ToolTitle>
            </StyledLeft>
            <Center>
                <ScenarioTitle title={title} />
            </Center>
            <StyledRight>
                <ScenarioConfigModeChip />
                <DeleteScenarioButton />
                <FileButton />
                <GoogleButton />
                <HelpButton />
            </StyledRight>
        </Root>
    )
}

export default App
