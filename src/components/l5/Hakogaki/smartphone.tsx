import { Fragment } from 'react'
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
`

const App = () => {
    return (
        <Fragment>
            <Main className="App">
                <Header />
                <BodySmartphone />
            </Main>
            <SmartphoneBottomMenu />
            <AutoSaveCautionModal />
            <DriveListModal />
        </Fragment>
    )
}

export default App
