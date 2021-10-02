import * as C from '../../lib/Const';

import ParagraphModel, { createParagraph } from './ParagraphModel';


// Scenarioのインターフェースを変えるときは
// ・CurrentScenarioFormatVersionを上げる
// ・load関数内で後方互換性をもたせる（詳細は作るときに考える。）
export default interface Scenario {
    formatVersion: number;
    title: string;
    paragraphList: ParagraphModel[];
    old: ParagraphModel[];
}

export const createScenario = () :Scenario => {
    return {
        formatVersion: C.CurrentScenarioFormatVersion,
        title: '',
        paragraphList: [
            createParagraph()
        ],
        old: []
    }
}