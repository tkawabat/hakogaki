import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../store/rootReducer'

import * as C from '../../lib/Const'

import SmartphoneParagraph from '../l3/SmartphoneParagraph'
import AddParagraphButton from '../l1/AddParagraphButton'

interface Props {}

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const MemoParagraph = React.memo(SmartphoneParagraph)

const App = (props: Props) => {
    const paragraphList = useSelector((state: RootState) => {
        return state.scenario.paragraphList.map((e, i) => {
            return <MemoParagraph paragraphId={i} paragraph={e} key={i} />
        })
    })

    return (
        <Body>
            {paragraphList}
            <AddParagraphButton />
        </Body>
    )
}

export default App
