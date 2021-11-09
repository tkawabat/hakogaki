import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { sp } from 'src/lib/Responsive'
import * as C from 'src/lib/Const'

import { RootState } from '../../store/rootReducer'

import Paragraph from '../l3/Paragraph'
import AddParagraphButton from '../l1/AddParagraphButton'

interface Props {}

const Body = styled.div`
    ${sp`
        display: none;
    `}
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

    const hidden = mode == C.ScenarioConfigMode.PLOT

    return (
        <Body hidden={hidden}>
            {paragraphList}
            <AddParagraphButton />
        </Body>
    )
}

export default App
