import { Fragment } from 'react'
import styled from 'styled-components'

import Header from '../l4/Header'
import BodyScenarioMode from '../l4/BodyScenarioMode'
import BodyPlotMode from '../l4/BodyPlotMode'
import AutoSaveCautionModal from '../l2/AutoSaveCautionModal'

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 150px;
`

const App = () => {
    return (
        <Fragment>
            <Main className="App">
                <Header />
                <BodyScenarioMode />
                <BodyPlotMode />
            </Main>
            <AutoSaveCautionModal />
        </Fragment>
    )
}

export default App