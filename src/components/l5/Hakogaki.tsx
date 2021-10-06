import React, { useRef } from 'react'
import styled from 'styled-components'

import Header from '../l4/Header'
import BodyScenarioMode from '../l4/BodyScenarioMode'
import BodyPlotMode from '../l4/BodyPlotMode'
import AddParagraphButton from '../l1/AddParagraphButton'
import AutoSaveCautionModal, {
    AutoSaveCautionModalHandler,
} from '../l2/AutoSaveCautionModal'


const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 150px;
`

export default function App() {
    const autoSaveCationModalRef = useRef({} as AutoSaveCautionModalHandler)

    return (
        <React.Fragment>
            <Main className="App">
                <Header />
                <BodyScenarioMode />
                <BodyPlotMode />
                <AddParagraphButton />
            </Main>
            <AutoSaveCautionModal ref={autoSaveCationModalRef} />
        </React.Fragment>
    )
}
