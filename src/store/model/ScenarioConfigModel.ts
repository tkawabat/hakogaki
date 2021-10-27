import * as C from '../../lib/Const'

export default interface ScenarioConfigModel {
    formatVersion: number
    mode: C.ScenarioConfigMode
    googleDriveFileId: string
}

export const createScenarioConfigModel = (): ScenarioConfigModel => {
    return {
        formatVersion: C.CurrentScenarioFormatVersion,
        mode: C.ScenarioConfigMode.SCENARIO,
        googleDriveFileId: '',
    }
}
