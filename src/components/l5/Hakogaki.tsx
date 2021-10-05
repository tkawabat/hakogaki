import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useSnackbar } from 'notistack'

import { RootState } from '../../store/rootReducer'
import ScenarioSlice, { LoadPayload } from '../../store/ScenarioSlice'
import Scenario from '../../store/model/ScenarioModel'

import * as C from '../../lib/Const'
import TimerUtil from '../../lib/TimerUtil'
import StorageUtil from '../../lib/StorageUtil'
import GAUtil from '../../lib/GAUtil'

import Header from '../l4/Header'
import BodyScenarioMode from '../l4/BodyScenarioMode'
import PlotParagraph from '../l3/PlotParagraph'
import AddParagraphButton from '../l1/AddParagraphButton'
import AutoSaveCautionModal, {
    AutoSaveCautionModalHandler,
} from '../l2/AutoSaveCautionModal'



interface Props {}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 150px;
`

const MemoHeader = React.memo(Header)
const MemoParagraph = React.memo(PlotParagraph)
const MemoAddParagraphButton = React.memo(AddParagraphButton)

export default function App(props: Props) {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const scenario = useSelector((state: RootState) => state.scenario)
    const paragraphList = scenario.paragraphList.map((e, i) => {
        return <MemoParagraph paragraphId={i} paragraph={e} key={i} />
    })
    const autoSaveCationModalRef = React.useRef(
        {} as AutoSaveCautionModalHandler
    )

    const loadStorage = () => {
        const json = StorageUtil.load(C.StorageKeyScenario)
        if (typeof json == 'string') {
            try {
                const scenario: Scenario = JSON.parse(json)
                const loadPayload: LoadPayload = {
                    scenario: scenario,
                }
                dispatch(ScenarioSlice.actions.load(loadPayload))

                // 通知
                enqueueSnackbar('前回のデータを読み込みました。', {
                    variant: C.NotificationType.SUCCESS,
                })
                autoSaveCationModalRef.current.open()
            } catch {
                // ERROR
                StorageUtil.remove(C.StorageKeyScenario)
            }
        }
    }

    // setIntervalの中で参照できるようにする。
    const scenarioRef = useRef(scenario)
    useEffect(() => {
        scenarioRef.current = scenario
    }, [scenario])

    const init = () => {
        // 初回のみ実行
        loadStorage()

        // 自動保存
        TimerUtil.setInterval(
            C.TimerSaveProject,
            () => {
                StorageUtil.save(
                    C.StorageKeyScenario,
                    JSON.stringify(scenarioRef.current)
                )
            },
            C.IntervalSaveScenario
        )

        GAUtil.pageview('hakogaki')
    }

    useEffect(init, [])

    return (
        <React.Fragment>
            <Main className="App">
                <MemoHeader title={scenario.title} />
                <BodyScenarioMode />
                <MemoAddParagraphButton />
            </Main>
            <AutoSaveCautionModal ref={autoSaveCationModalRef} />
        </React.Fragment>
    )
}
