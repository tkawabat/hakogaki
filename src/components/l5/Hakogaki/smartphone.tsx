import styled from 'styled-components'

import { pc, sp} from '../../../lib/Responsive'

import Header from '../../l4/Header'
import BodySmartphone from '../../l4/BodySmartphone'
import SmartphoneBottomMenu from '../../l2/SmartphoneBottomMenu'
import AutoSaveCautionModal from '../../l2/AutoSaveCautionModal'
import DriveListModal from '../../l2/DriveFileListModal'

const Main = styled.div`
    ${sp`
        display: flex;
    `}
    ${pc`
        display: none;
    `}
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    min-height: 100%;
`

const App = () => {
    return (
        <Main className="App">
            <Header />
            <BodySmartphone />

            <SmartphoneBottomMenu />
            <AutoSaveCautionModal />
            <DriveListModal />
        </Main>
    )
}

export default App
