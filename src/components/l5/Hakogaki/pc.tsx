import styled from 'styled-components'

import { pc, sp} from '../../../lib/Responsive'

import Header from '../../l4/Header'
import BodyScenarioMode from '../../l4/BodyScenarioMode'
import BodyPlotMode from '../../l4/BodyPlotMode'
import AutoSaveCautionModal from '../../l2/AutoSaveCautionModal'
import DriveListModal from '../../l2/DriveFileListModal'

const Main = styled.div`
    ${pc`
        display: flex;
    `}
    ${sp`
        display: none;
    `}
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 150px;
`

const App = () => {
    return (
        <Main className="App">
            <Header />
            <BodyScenarioMode />
            <BodyPlotMode />
            <AutoSaveCautionModal />
            <DriveListModal />
        </Main>
    )
}

export default App
