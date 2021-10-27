import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as C from '../lib/Const'

import ScenarioModel, { createScenario } from './model/ScenarioModel'
import { createParagraph } from './model/ParagraphModel'
import { createTodo } from './model/TodoModel'

export interface LoadPayload {
    scenario: ScenarioModel
}

export interface ScenarioConfigModePayload {
    mode: C.ScenarioConfigMode
}

export interface ScenarioConfigGoogleDriveFileIdPayload {
    fileId: string
}

export interface AddParagraphUnderPayload {
    paragraphId: number
}

export interface DeleteParagraphPayload {
    paragraphId: number
}

export interface MoveUpParagraphPayload {
    paragraphId: number
}

export interface MoveDownParagraphPayload {
    paragraphId: number
}

export interface TextPayload {
    text: string
}

export interface ToggleParagraphCheckedPayload {
    paragraphId: number
}

export interface ChangeSubTitlePayload {
    paragraphId: number
    subTitle: string
}

export interface ChangeTextPayload {
    paragraphId: number
    text: string
}

export interface AddTodoPayload {
    paragraphId: number
}

export interface DeleteTodoPayload {
    paragraphId: number
    todoId: number
}

export interface ChangeTodoTextPayload {
    paragraphId: number
    todoId: number
    text: string
}

export interface ToggleTodoPayload {
    paragraphId: number
    todoId: number
}

export interface ChangeParagraphMemoPayload {
    paragraphId: number
    memo: string
}

const initialState: ScenarioModel = createScenario()

const slice = createSlice({
    name: 'scenario',
    initialState,
    reducers: {
        load: (state, action: PayloadAction<LoadPayload>) => {
            const scenario = action.payload.scenario
            if (
                scenario.config.formatVersion < C.CurrentScenarioFormatVersion
            ) {
                // TODO
                window.alert(
                    'プロジェクトファイルのバージョンが古く読み込めません。'
                )
            }
            state.title = scenario.title
            state.memo = scenario.memo
            state.config = scenario.config
            state.paragraphList = scenario.paragraphList
            state.old = scenario.paragraphList // 読み込み時点のデータをoldにセット
        },

        deleteScenario: (state: ScenarioModel) => {
            const scenario = createScenario()
            state.title = scenario.title
            state.memo = scenario.memo
            state.config = scenario.config
            state.paragraphList = scenario.paragraphList
            state.old = scenario.paragraphList
        },

        changeScenarioConfigMode: (
            state,
            action: PayloadAction<ScenarioConfigModePayload>
        ) => {
            state.config.mode = action.payload.mode
        },

        setGoogleDriveFileId: (
            state, action: PayloadAction<ScenarioConfigGoogleDriveFileIdPayload>
        ) => {
            state.config.googleDriveFileId = action.payload.fileId
        },

        addParagraph: (state: ScenarioModel) => {
            state.paragraphList.push(createParagraph())
        },

        addParagraphUnder: (
            state,
            action: PayloadAction<AddParagraphUnderPayload>
        ) => {
            const id = action.payload.paragraphId
            if (id < 0 || id >= state.paragraphList.length) return
            state.paragraphList.splice(
                action.payload.paragraphId + 1,
                0,
                createParagraph()
            )
        },

        deleteParagraph: (
            state: ScenarioModel,
            action: PayloadAction<DeleteParagraphPayload>
        ) => {
            state.paragraphList.splice(action.payload.paragraphId, 1)
        },

        moveUpParagraph: (
            state,
            action: PayloadAction<MoveUpParagraphPayload>
        ) => {
            const id = action.payload.paragraphId
            if (id == 0) return
            if (!state.paragraphList[id]) return
            const paragraph = state.paragraphList[id]
            state.paragraphList[id] = state.paragraphList[id - 1]
            state.paragraphList[id - 1] = paragraph
        },

        moveDownParagraph: (
            state,
            action: PayloadAction<MoveUpParagraphPayload>
        ) => {
            const id = action.payload.paragraphId
            if (id >= state.paragraphList.length - 1) return
            if (!state.paragraphList[id]) return
            const paragraph = state.paragraphList[id]
            state.paragraphList[id] = state.paragraphList[id + 1]
            state.paragraphList[id + 1] = paragraph
        },

        changeTitle: (state, action: PayloadAction<TextPayload>) => {
            state.title = action.payload.text
        },

        changeMemo: (state, action: PayloadAction<TextPayload>) => {
            state.memo = action.payload.text
        },

        toggleParagraphChecked: (
            state,
            action: PayloadAction<ToggleParagraphCheckedPayload>
        ) => {
            const checked =
                state.paragraphList[action.payload.paragraphId].checked
            state.paragraphList[action.payload.paragraphId].checked = !checked
        },

        changeSubTitle: (
            state,
            action: PayloadAction<ChangeSubTitlePayload>
        ) => {
            state.paragraphList[action.payload.paragraphId].subTitle =
                action.payload.subTitle
        },

        changeText: (state, action: PayloadAction<ChangeTextPayload>) => {
            state.paragraphList[action.payload.paragraphId].text =
                action.payload.text
        },

        addTodo: (state, action: PayloadAction<AddTodoPayload>) => {
            state.paragraphList[action.payload.paragraphId].todo.push(
                createTodo()
            )
        },

        deleteTodo: (state, action: PayloadAction<DeleteTodoPayload>) => {
            state.paragraphList[action.payload.paragraphId].todo.splice(
                action.payload.todoId,
                1
            )
        },

        changeTodoText: (
            state,
            action: PayloadAction<ChangeTodoTextPayload>
        ) => {
            state.paragraphList[action.payload.paragraphId].todo[
                action.payload.todoId
            ].text = action.payload.text
        },

        toggleTodo: (state, action: PayloadAction<ToggleTodoPayload>) => {
            const checked =
                state.paragraphList[action.payload.paragraphId].todo[
                    action.payload.todoId
                ].checked
            state.paragraphList[action.payload.paragraphId].todo[
                action.payload.todoId
            ].checked = !checked
        },

        changeParagraphMemo: (state, action: PayloadAction<ChangeParagraphMemoPayload>) => {
            state.paragraphList[action.payload.paragraphId].memo =
                action.payload.memo
        },
    },
})

export default slice
