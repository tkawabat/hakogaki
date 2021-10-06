import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../store/rootReducer'

import * as C from '../../lib/Const'

import Paragraph from '../l3/Paragraph'

interface Props {}

const Body = styled.div`
    display: ${(props) => (props.hidden ? 'none' : 'flex')};
    flex-direction: column;
    width: 100%;
`

const MemoParagraph = React.memo(Paragraph)

const App = (props: Props) => {
    const mode = useSelector((state: RootState) => state.scenario.config.mode)
    const paragraphList = useSelector((state: RootState) => {
        return state.scenario.paragraphList.map((e, i) => {
            return <MemoParagraph paragraphId={i} paragraph={e} key={i} />
        })
    })

    return (
        <Body hidden={mode != C.ScenarioConfigMode.SCENARIO}>
            {paragraphList}
        </Body>
    )
}

export default App
