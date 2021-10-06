import * as C from '../../lib/Const'

import ParagraphModel, { createParagraph } from './ParagraphModel'
import ScenarioConfigModel, {
    createScenarioConfigModel,
} from './ScenarioConfigModel'

// Scenarioのインターフェースを変えるときは
// ・CurrentScenarioFormatVersionを上げる
// ・load関数内で後方互換性をもたせる（詳細は作るときに考える。）
export default interface Scenario {
    title: string
    memo: string
    config: ScenarioConfigModel
    paragraphList: ParagraphModel[]
    old: ParagraphModel[]
}

export const createScenario = (): Scenario => {
    return {
        title: '',
        memo: '',
        config: createScenarioConfigModel(),
        paragraphList: [createParagraph()],
        old: [],
    }
}
