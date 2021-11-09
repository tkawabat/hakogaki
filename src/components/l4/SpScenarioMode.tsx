import { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { pc } from '../../lib/Responsive'
import * as C from 'src/lib/Const'

import { RootState } from 'src/store/rootReducer'

import SpParagraph from '../l3/SpParagraph'
import AddParagraphButton from '../l1/AddParagraphButton'

interface Props {}

const Body = styled.div`
    ${pc`
        display: none;
    `}
    display: ${(props) => (props.hidden ? 'none' : 'flex')};
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`

const MemoParagraph = memo(SpParagraph)

const App = (props: Props) => {
    const mode = useSelector((state: RootState) => state.scenario.config.mode)

    const paragraphList = useSelector((state: RootState) => {
        return state.scenario.paragraphList.map((e, i) => {
            return <MemoParagraph paragraphId={i} paragraph={e} key={i} />
        })
    })

    const hidden = mode == C.ScenarioConfigMode.SMARTPHONE_SCENARIO_MEMO
        || mode == C.ScenarioConfigMode.SMARTPHONE_MEMO

    return (
        <Body hidden={hidden}>
            {paragraphList}
            <AddParagraphButton />
        </Body>
    )
}

export default App
