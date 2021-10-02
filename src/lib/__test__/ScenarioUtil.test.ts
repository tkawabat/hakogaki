import sinon from 'sinon';

import ScenarioUtil from '../ScenarioUtil';
import ScenarioModel, { createScenario } from '../../store/model/ScenarioModel';
import ParagraphModel, { createParagraph } from '../../store/model/ParagraphModel';
import { createTodo } from '../../store/model/TodoModel';


let stubs :sinon.SinonStub[] = [];


describe('isParagraphEmpty', () => {

    test('正常系 true', () => {
        const input: ParagraphModel = createParagraph();
        // TODOを足しても、checkしても空判定
        input.todo.push(createTodo());
        input.todo[1].checked = true;

        const actual = ScenarioUtil.isParagraphEmpty(input);

        const expected = true;
        expect(actual).toEqual(expected);
    });

    test('正常系 false text', () => {
        const input: ParagraphModel = createParagraph();
        input.text = 'a';

        const actual = ScenarioUtil.isParagraphEmpty(input);

        const expected = false;
        expect(actual).toEqual(expected);
    });

    test('正常系 false title', () => {
        const input: ParagraphModel = createParagraph();
        input.subTitle = 'a';

        const actual = ScenarioUtil.isParagraphEmpty(input);

        const expected = false;
        expect(actual).toEqual(expected);
    });

    test('正常系 false memo', () => {
        const input: ParagraphModel = createParagraph();
        input.memo = 'a';

        const actual = ScenarioUtil.isParagraphEmpty(input);

        const expected = false;
        expect(actual).toEqual(expected);
    });

    test('正常系 false todo', () => {
        const input: ParagraphModel = createParagraph();
        input.todo[1].text = 'a';

        const actual = ScenarioUtil.isParagraphEmpty(input);

        const expected = false;
        expect(actual).toEqual(expected);
    });

});

describe('getTextLength', () => {

    test('正常系 空', () => {
        const input: ParagraphModel[] = [];

        const actual = ScenarioUtil.getTextLength(input);

        const expected = 0;
        expect(actual).toEqual(expected);
    });

    test('正常系 0', () => {
        const input: ParagraphModel[] = [
            createParagraph(),
            createParagraph(),
        ];

        const actual = ScenarioUtil.getTextLength(input);

        const expected = 0;
        expect(actual).toEqual(expected);
    })

    test('正常系 データあり', () => {
        const input: ParagraphModel[] = [
            createParagraph(),
            createParagraph(),
        ];
        input[1].text = 'aa0123あいうえお';

        const actual = ScenarioUtil.getTextLength(input);

        const expected = 11;
        expect(actual).toEqual(expected);
    })
});


describe('getCheckedTodoNum', () => {

    test('正常系 空', () => {
        const input: ParagraphModel[] = [];

        const actual = ScenarioUtil.getCheckedTodoNum(input);

        const expected = 0;
        expect(actual).toEqual(expected);
    })

    test('正常系 0', () => {
        const input: ParagraphModel[] = [
            createParagraph(),
            createParagraph(),
        ];

        const actual = ScenarioUtil.getCheckedTodoNum(input);

        const expected = 0;
        expect(actual).toEqual(expected);
    })

    test('正常系 2', () => {
        const input: ParagraphModel[] = [
            createParagraph(),
            createParagraph(),
        ];
        input[0].todo[0].checked = true;
        input[1].todo[1].checked = true;

        const actual = ScenarioUtil.getCheckedTodoNum(input);

        const expected = 2;
        expect(actual).toEqual(expected)
    })
});


describe('getProgress', () => {

    afterEach(() => {
        stubs.forEach((s) => {
            s.restore();
        });
        stubs = [];
    })

    test('正常系 進捗なし', () => {
        const input = createScenario();
        input.paragraphList[0].text = 'a'; // oldと差をつけるため

        // stub
        const stubGetTextLength = sinon.stub(ScenarioUtil, 'getTextLength');
        stubGetTextLength.withArgs(input.paragraphList).returns(1);
        stubGetTextLength.withArgs(input.old).returns(1);
        stubs.push(stubGetTextLength);

        const stubgetCheckedTodoNum = sinon.stub(ScenarioUtil, 'getCheckedTodoNum');
        stubgetCheckedTodoNum.withArgs(input.paragraphList).returns(1);
        stubgetCheckedTodoNum.withArgs(input.old).returns(1);
        stubs.push(stubgetCheckedTodoNum);
        
        // execute
        const actual = ScenarioUtil.getProgress(input);

        const expected: string[] = [];
        expect(actual).toEqual(expected)
    })

    test('正常系 進捗あり', () => {
        const input = createScenario();
        input.paragraphList[0].text = 'a'; // oldと差をつけるため

        // stub
        const stubGetTextLength = sinon.stub(ScenarioUtil, 'getTextLength');
        stubGetTextLength.withArgs(input.paragraphList).returns(2);
        stubGetTextLength.withArgs(input.old).returns(1);
        stubs.push(stubGetTextLength);

        const stubgetCheckedTodoNum = sinon.stub(ScenarioUtil, 'getCheckedTodoNum');
        stubgetCheckedTodoNum.withArgs(input.paragraphList).returns(3);
        stubgetCheckedTodoNum.withArgs(input.old).returns(1);
        stubs.push(stubgetCheckedTodoNum);
        
        // execute
        const actual = ScenarioUtil.getProgress(input);

        const expected: string[] = [
            '【進捗】1文字書きました。',
            '【進捗】2個のTodoを完了させました。',
        ];
        expect(actual).toEqual(expected)
    })
});