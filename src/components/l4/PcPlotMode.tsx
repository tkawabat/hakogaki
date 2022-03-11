import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { sp } from 'src/lib/Responsive'
import * as C from 'src/lib/Const'

import { RootState } from 'src/store/rootReducer'
import ScenarioSlice, { TextPayload } from 'src/store/ScenarioSlice'

import PlotParagraph from '../l3/PlotParagraph'
import AddParagraphButton from '../l1/AddParagraphButton'

interface Props {}

const Body = styled.div`
    ${sp`
        display: none;
    `}
    display: ${(props) => (props.hidden ? 'none' : 'flex')};
    width: 100%;
    height: 100%;
`
const BodyLeft = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 60px);
    position: sticky;
    top: 10px;
    margin: 5px;
`

const BodyRight = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 5px;
    max-width: 550px;
`

const ScenarioMemoArea = styled.textarea`
    width: 100%;
    height: 100%;
`

const MemoPlotParagraph = memo(PlotParagraph)

const App = (props: Props) => {
    const dispatch = useDispatch()
    const mode = useSelector((state: RootState) => state.scenario.config.mode)
    const memo = useSelector((state: RootState) => state.scenario.memo)
    const paragraphList = useSelector((state: RootState) => {
        return state.scenario.paragraphList.map((e, i) => {
            return <MemoPlotParagraph paragraphId={i} paragraph={e} key={i} />
        })
    })

    const changeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const payload: TextPayload = {
            text: e.target.value,
        }
        dispatch(ScenarioSlice.actions.changeMemo(payload))
    }

    return (
        <Body hidden={mode != C.ScenarioConfigMode.PLOT}>
            <BodyLeft>
                <ScenarioMemoArea
                    placeholder={'全体メモ・キャラクター設定など'}
                    onChange={changeMemo}
                    value={memo}
                />
            </BodyLeft>
            <BodyRight>
                {paragraphList}
                <AddParagraphButton />
            </BodyRight>
        </Body>
    )
}

export default App
