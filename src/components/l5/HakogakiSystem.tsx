import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'

import { RootState } from '../../store/rootReducer'
import ScenarioSlice, { LoadPayload } from '../../store/ScenarioSlice'
import Scenario from '../../store/model/ScenarioModel'

import * as C from '../../lib/Const'
import CommonUtil from 'src/lib/CommonUtil'
import TimerUtil from '../../lib/TimerUtil'
import StorageUtil from '../../lib/StorageUtil'
import GAUtil from '../../lib/GAUtil'

import { AutoSaveCautionModalHandler } from '../l2/AutoSaveCautionModal'


export default function App() {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const scenario = useSelector((state: RootState) => state.scenario)
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

        CommonUtil.init(dispatch, enqueueSnackbar)

        GAUtil.pageview('hakogaki')
    }

    useEffect(init, [])

    return null
}
