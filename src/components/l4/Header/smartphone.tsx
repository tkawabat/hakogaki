import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { RootState } from 'src/store/rootReducer'

import * as C from '../../../lib/Const'
import { pc, sp} from '../../../lib/Responsive'

import GoogleButton from '../../l2/GoogleButton'
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
    padding-left: 10px;
    padding-right: 5px;
    background-color: #d7e6ef;
`

const Icon = styled.img`
    display: flex;
    width: 32px;
    height: 32px;
    margin-right: 10px;
`

const App = () => {
    const title = useSelector((state: RootState) => state.scenario.title)

    return (
        <Root className="header">
            <Icon src={'/logo192.png'} />
            <ScenarioTitle title={title} />
            <GoogleButton />
        </Root>
    )
}

export default App
