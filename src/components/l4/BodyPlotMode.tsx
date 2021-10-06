import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../store/rootReducer'

import * as C from '../../lib/Const'

import PlotParagraph from '../l3/PlotParagraph'

interface Props {}

const Body = styled.div`
    display: ${(props) => (props.hidden ? 'none' : 'flex')};
    width: 100%;
    max-width: 800px;
`
const BodyLeft = styled.div`
    display: flex;
    flex: 2;
    width: 100%;
    height: calc(100vh - 60px);
    position: sticky;
    top: 10px;
    margin: 5px;
`

const BodyRight = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    width: 100%;
    margin: 5px;
`

const ScenarioMemoArea = styled.textarea`
    width: 100%;
    height: 100%;
`

const MemoPlotParagraph = React.memo(PlotParagraph)

const App = (props: Props) => {
    const mode = useSelector((state: RootState) => state.scenario.config.mode)
    const paragraphList = useSelector((state: RootState) => {
        return state.scenario.paragraphList.map((e, i) => {
            return <MemoPlotParagraph paragraphId={i} paragraph={e} key={i} />
        })
    })

    return (
        <Body hidden={mode != C.ScenarioConfigMode.PLOT}>
            <BodyLeft>
                <ScenarioMemoArea
                    placeholder={'全体メモ・キャラクター設定など'}
                />
            </BodyLeft>
            <BodyRight>{paragraphList}</BodyRight>
        </Body>
    )
}

export default App
