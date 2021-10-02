import * as C from './Const';

import ParagraphModel from "../store/model/ParagraphModel";
import ScenarioModel from "../store/model/ScenarioModel";
import TodoModel from "../store/model/TodoModel";


class ScenarioUtil {

    isParagraphEmpty(paragraph: ParagraphModel): boolean {
        if (paragraph.subTitle.length > 0) return false;
        if (paragraph.text.length > 0) return false;
        if (paragraph.memo.length > 0) return false;
        if (paragraph.todo.some((p) => { // todoは文字を書いているかどうかだけ見る
            return p.text.length > 0;
        })) {
            return false;
        }

        return true;
    }

    getTextLength(paragraphList: ParagraphModel[]): number {
        return paragraphList.reduce((sum: number, p: ParagraphModel) => {
            return sum + p.text.length
        }, 0);
    }

    getCheckedTodoNum(paragraphList: ParagraphModel[]): number {
        const toodoReducer = (sum: number, t: TodoModel) => {
            return sum + (t.checked ? 1 : 0);
        }

        const paragraphReducer = (sum: number, p: ParagraphModel) => {
            return sum + p.todo.reduce(toodoReducer, 0);
        }

        return paragraphList.reduce(paragraphReducer, 0);
    }

    getTitle(scenario: ScenarioModel) {
        return scenario.title ? scenario.title : C.NoTitleFileName;
    }

    getScenarioText(scenario: ScenarioModel) :string {
        const ret = scenario.title ?
        scenario.title + "\r\n\r\n" : '';
    
        return ret + scenario.paragraphList.map((p) => {
            const title = p.subTitle ?
                p.subTitle + "\r\n\r\n" : '';
            return title + p.text + "\r\n\r\n";
        }).join("\r\n\r\n");
    }

    getProgress(scenario: ScenarioModel): string[] {
        const ret: string[] = [];
    
        const previousTextLength = this.getTextLength(scenario.old);
        const nowTextLength = this.getTextLength(scenario.paragraphList);
        const previousCheckedTodoNum = this.getCheckedTodoNum(scenario.old);
        const nowCheckedTodoNum = this.getCheckedTodoNum(scenario.paragraphList);
    
        if (previousTextLength < nowTextLength) {
            const diff = nowTextLength - previousTextLength;
            ret.push('【進捗】' + diff + '文字書きました。');
        }
    
        if (previousCheckedTodoNum < nowCheckedTodoNum) {
            const diff = nowCheckedTodoNum - previousCheckedTodoNum;
            ret.push('【進捗】' + diff + '個のTodoを完了させました。');
        }
    
        return ret;
    }
}

export default new ScenarioUtil();