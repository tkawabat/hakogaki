import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../store/rootReducer'

import Paragraph from '../l3/Paragraph'


interface Props {
}

const MemoParagraph = React.memo(Paragraph)

const App = (props: Props) => {
    const scenario = useSelector((state: RootState) => state.scenario)
    const paragraphList = scenario.paragraphList.map((e, i) => {
        return <MemoParagraph paragraphId={i} paragraph={e} key={i} />
    })

    return (
        <>
            {paragraphList}
        </>
    )
}

export default App
