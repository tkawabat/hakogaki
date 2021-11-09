import styled from 'styled-components'

import { pc, sp} from '../../lib/Responsive'

import Header from '../l4/Header'

import PcScenarioMode from '../l4/PcScenarioMode'
import PcPlotMode from '../l4/PcPlotMode'
import SpScenarioMode from '../l4/SpScenarioMode'
import SpScenarioMemoMode from '../l4/SpScenarioMemoMode'
import SpMemoMode from '../l4/SpMemoMode'

import SmartphoneBottomMenu from '../l4/SpBottomMenu'
import AutoSaveCautionModal from '../l2/AutoSaveCautionModal'
import DriveListModal from '../l2/DriveFileListModal'

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    ${sp`
        // height: calc(100% - 40px);
        // min-height: calc(100% - 40px);
        height: 100%;
    `}
    ${pc`
        margin-bottom: 150px;
    `}
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: scroll;
`



const App = () => {
    return (
        <Main className="App">
            <Header />
            <Body>
                <PcScenarioMode />
                <PcPlotMode />
                <SpScenarioMode />
                <SpScenarioMemoMode />
                <SpMemoMode />
            </Body>
            <SmartphoneBottomMenu />
            <AutoSaveCautionModal />
            <DriveListModal />
        </Main>
    )
}

export default App
