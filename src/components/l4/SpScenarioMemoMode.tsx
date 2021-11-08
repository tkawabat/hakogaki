import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { pc } from '../../lib/Responsive'
import * as C from 'src/lib/Const'

import { RootState } from 'src/store/rootReducer'
import ScenarioSlice from 'src/store/ScenarioSlice'

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

const ScenarioMemoArea = styled.textarea`
    width: 95%;
    height: 100%;
`

const App = (props: Props) => {
    const dispatch = useDispatch()
    const mode = useSelector((state: RootState) => state.scenario.config.mode)
    const memo = useSelector((state: RootState) => state.scenario.memo)

    const changeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const payload = {
            text: e.target.value,
        }
        dispatch(ScenarioSlice.actions.changeMemo(payload))
    }

    return (
        <Body hidden={mode != C.ScenarioConfigMode.SMARTPHONE_SCENARIO_MEMO}>
            <ScenarioMemoArea
                placeholder={'全体メモ・キャラクター設定など'}
                onChange={changeMemo}
                value={memo}
            />
        </Body>
    )
}

export default App
