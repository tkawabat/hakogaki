import * as C from './Const'

import ScenarioSlice from 'src/store/ScenarioSlice'
import ParagraphModel from '../store/model/ParagraphModel'
import ScenarioModel from '../store/model/ScenarioModel'
import TodoModel from '../store/model/TodoModel'

import GoogleDriveApiDao from '../dao/GoogleDriveApiDao'

import CommonUtil from './CommonUtil'

class ScenarioUtil {
    isParagraphEmpty(paragraph: ParagraphModel): boolean {
        if (paragraph.subTitle.length > 0) return false
        if (paragraph.text.length > 0) return false
        if (paragraph.memo.length > 0) return false
        if (
            paragraph.todo.some((p) => {
                // todoは文字を書いているかどうかだけ見る
                return p.text.length > 0
            })
        ) {
            return false
        }

        return true
    }

    getTextLength(paragraphList: ParagraphModel[]): number {
        return paragraphList.reduce((sum: number, p: ParagraphModel) => {
            return sum + p.text.length
        }, 0)
    }

    getCheckedParagraphNum(paragraphList: ParagraphModel[]): number {
        const paragraphReducer = (sum: number, p: ParagraphModel) => {
            return sum + (p.checked ? 1 : 0)
        }

        return paragraphList.reduce(paragraphReducer, 0)
    }

    getCheckedTodoNum(paragraphList: ParagraphModel[]): number {
        const todoReducer = (sum: number, t: TodoModel) => {
            return sum + (t.checked ? 1 : 0)
        }

        const paragraphReducer = (sum: number, p: ParagraphModel) => {
            return sum + p.todo.reduce(todoReducer, 0)
        }

        return paragraphList.reduce(paragraphReducer, 0)
    }

    getTitle(scenario: ScenarioModel) {
        return scenario.title ? scenario.title : C.NoTitleFileName
    }

    getScenarioText(scenario: ScenarioModel): string {
        const ret = scenario.title ? scenario.title + '\r\n\r\n' : ''

        return (
            ret +
            scenario.paragraphList
                .map((p) => {
                    const title = p.subTitle ? p.subTitle + '\r\n\r\n' : ''
                    return title + p.text + '\r\n\r\n'
                })
                .join('\r\n\r\n')
        )
    }

    getProgress(scenario: ScenarioModel): string[] {
        const ret: string[] = []

        const previousTextLength = this.getTextLength(scenario.old)
        const nowTextLength = this.getTextLength(scenario.paragraphList)
        const previousCheckedParagraphNum = this.getCheckedParagraphNum(scenario.old)
        const nowCheckedParagraphNum = this.getCheckedParagraphNum(scenario.paragraphList)
        const previousCheckedTodoNum = this.getCheckedTodoNum(scenario.old)
        const nowCheckedTodoNum = this.getCheckedTodoNum(scenario.paragraphList)

        if (previousTextLength < nowTextLength) {
            const diff = nowTextLength - previousTextLength
            ret.push('【進捗】' + diff + '文字書きました。')
        }

        if (previousCheckedParagraphNum < nowCheckedParagraphNum) {
            const diff = nowCheckedParagraphNum - previousCheckedParagraphNum
            ret.push('【進捗】' + diff + '個の段落を完了させました。')
        }

        if (previousCheckedTodoNum < nowCheckedTodoNum) {
            const diff = nowCheckedTodoNum - previousCheckedTodoNum
            ret.push('【進捗】' + diff + '個のTodoを完了させました。')
        }

        return ret
    }

    loadProject(json: string) {
        try {
            const scenario: ScenarioModel = JSON.parse(json)
            const payload = {
                scenario: scenario,
            }
            CommonUtil.dispatch(ScenarioSlice.actions.load(payload))
            const message = 'プロジェクトファイルを読み込みました。'
            CommonUtil.enqueueSnackbar(message, {
                variant: C.NotificationType.SUCCESS,
            })
        } catch {
            const message = 'プロジェクトファイルの読み込みに失敗しました。形式が間違っています。'
            CommonUtil.enqueueSnackbar(message, {
                variant: C.NotificationType.ERROR,
            })
        }
    }

    async loadProjectFromDrive(fileId: string) {
        const json = await GoogleDriveApiDao.getFile(fileId)
        if (!json) {
            // error
            const message = 'Google Driveから読み込みに失敗しました。'
            CommonUtil.enqueueSnackbar(message, {
                variant: C.NotificationType.ERROR,
            })
            return
        }
        this.loadProject(json)
    }

    async saveProject2Drive(scenario: ScenarioModel) {
        const copied: ScenarioModel = JSON.parse(JSON.stringify(scenario))

        // ファイルがなければ作成
        if (!copied.config.googleDriveFileId) {
            const fileName = this.getTitle(scenario) + '.json'
            const fileId = await await GoogleDriveApiDao.createFile(fileName)
            if (!fileId) return // error

            copied.config.googleDriveFileId = fileId
            CommonUtil.dispatch(
                ScenarioSlice.actions.setGoogleDriveFileId({
                    fileId: fileId,
                })
            )
        }

        // ファイルの中身を更新
        GoogleDriveApiDao.patchFile(
            copied.config.googleDriveFileId,
            JSON.stringify(scenario)
        )
    }

    async dump2Drive(scenario: ScenarioModel) {
        // ファイル作成
        const fileName = this.getTitle(scenario) + '.txt'
        const fileId = await await GoogleDriveApiDao.createFile(fileName)
        if (!fileId) return // error

        CommonUtil.dispatch(
            ScenarioSlice.actions.setGoogleDriveFileId({
                fileId: fileId,
            })
        )

        // ファイルの中身を更新
        GoogleDriveApiDao.patchFile(fileId, this.getScenarioText(scenario))?.catch(() => {})
    }
}

export default new ScenarioUtil()
