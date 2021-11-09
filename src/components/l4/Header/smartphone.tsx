import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { RootState } from 'src/store/rootReducer'

import * as C from '../../../lib/Const'
import { pc, sp} from '../../../lib/Responsive'

import GoogleButton from '../../l2/GoogleButton'
import HelpButton from '../../l1/HelpButton'
import ScenarioTitle from 'src/components/l1/ScenarioTitle'

const Root = styled.div`
    ${sp`
        display: flex;
    `}
    ${pc`
        display: none;
    `}

    display: flex;
    align-items: center;
    justify-items: center;
    
    width: 100%;
    height: 50px;
    background-color: #d7e6efb5;
`

const Icon = styled.img`
    display: flex;
    width: 24px;
    height: 24px;
    margin-left: 5px;
    margin-right: 10px;
`

const Right = styled.div`
    display: flex;
    margin-left: 3px;
    margin-right: 3px;
`

const App = () => {
    const title = useSelector((state: RootState) => state.scenario.title)

    return (
        <Root className="header">
            <Icon src={'/logo192.png'} />
            <ScenarioTitle title={title} />
            <Right>
                <GoogleButton />
                <HelpButton />
            </Right>
        </Root>
    )
}

export default App
