import { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../store/rootReducer'

import { pc } from '../../lib/Responsive'
import * as C from '../../lib/Const'

import SpParagraphMemo from '../l3/SpParagraphMemo'
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
    margin-bottom: 45px;
`

const MemoParagraphMemo = memo(SpParagraphMemo)

const App = (props: Props) => {
    const mode = useSelector((state: RootState) => state.scenario.config.mode)
    const memoList = useSelector((state: RootState) => {
        return state.scenario.paragraphList.map((e, i) => {
            return <MemoParagraphMemo paragraphId={i} paragraph={e} key={i} />
        })
    })

    return (
        <Body hidden={mode != C.ScenarioConfigMode.SMARTPHONE_MEMO}>
            {memoList}
            <AddParagraphButton />
        </Body>
    )
}

export default App
