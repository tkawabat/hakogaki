import sinon from 'sinon'

import ScenarioSlice, {
    AddParagraphUnderPayload,
    ChangeParagraphMemoPayload,
    MoveDownParagraphPayload,
    MoveUpParagraphPayload,
} from '../ScenarioSlice'
import ScenarioModel, { createScenario } from '../model/ScenarioModel'
import { createParagraph } from '../model/ParagraphModel'

const reducer = ScenarioSlice.reducer
const actions = ScenarioSlice.actions

// test('should return the initial state', () => {
//   expect(ScenarioSlice.reducer(undefined, {})).toEqual([
//     {
//       text: 'Use Redux',
//       completed: false,
//       id: 0
//     }
//   ])
// })

describe('addParagraphUnder', () => {
    test('正常系 追加しない 0件', () => {
        const input = createScenario()
        input.paragraphList = []

        const payload: AddParagraphUnderPayload = {
            paragraphId: 0,
        }
        const actual = reducer(input, actions.addParagraphUnder(payload))

        expect(actual.paragraphList.length).toEqual(0)
    })

    test('正常系 追加しない 1件でid=1を指定', () => {
        const input = createScenario()
        input.paragraphList = [createParagraph()]

        const payload: AddParagraphUnderPayload = {
            paragraphId: 1,
        }
        const actual = reducer(input, actions.addParagraphUnder(payload))

        expect(actual.paragraphList.length).toEqual(1)
    })

    test('正常系 追加する 1件でid=0を指定', () => {
        const input = createScenario()
        input.paragraphList = [createParagraph()]
        input.paragraphList[0].text = 'a'

        const payload: AddParagraphUnderPayload = {
            paragraphId: 0,
        }
        const actual = reducer(input, actions.addParagraphUnder(payload))

        expect(actual.paragraphList[0].text).toEqual('a')
        expect(actual.paragraphList[1].text).toEqual('')
    })

    test('正常系 追加する 2件でid=0を指定', () => {
        const input = createScenario()
        input.paragraphList = [createParagraph(), createParagraph()]
        input.paragraphList[0].text = 'a'
        input.paragraphList[1].text = 'b'

        const payload: AddParagraphUnderPayload = {
            paragraphId: 0,
        }
        const actual = reducer(input, actions.addParagraphUnder(payload))

        expect(actual.paragraphList[0].text).toEqual('a')
        expect(actual.paragraphList[1].text).toEqual('')
        expect(actual.paragraphList[2].text).toEqual('b')
    })
})

describe('moveUpParagraph', () => {
    let input: ScenarioModel

    beforeEach(() => {
        input = createScenario()
        input.paragraphList = [createParagraph(), createParagraph()]
        input.paragraphList[0].text = 'a'
        input.paragraphList[1].text = 'b'
    })

    test('正常系 入れ替えしない id0', () => {
        const payload: MoveUpParagraphPayload = {
            paragraphId: 0,
        }
        const actual = reducer(input, actions.moveUpParagraph(payload))

        expect(actual.paragraphList[0].text).toEqual('a')
        expect(actual.paragraphList[1].text).toEqual('b')
    })

    test('正常系 入れ替えしない 存在しないid', () => {
        const payload: MoveUpParagraphPayload = {
            paragraphId: 2,
        }
        const actual = reducer(input, actions.moveUpParagraph(payload))

        expect(actual.paragraphList[0].text).toEqual('a')
        expect(actual.paragraphList[1].text).toEqual('b')
    })

    test('正常系 入れ替え成功', () => {
        const payload: MoveUpParagraphPayload = {
            paragraphId: 1,
        }
        const actual = reducer(input, actions.moveUpParagraph(payload))

        expect(actual.paragraphList[0].text).toEqual('b')
        expect(actual.paragraphList[1].text).toEqual('a')
    })
})

describe('moveDownParagraph', () => {
    let input: ScenarioModel

    beforeEach(() => {
        input = createScenario()
        input.paragraphList = [createParagraph(), createParagraph()]
        input.paragraphList[0].text = 'a'
        input.paragraphList[1].text = 'b'
    })

    test('正常系 入れ替えしない id1', () => {
        const payload: MoveDownParagraphPayload = {
            paragraphId: 1,
        }
        const actual = reducer(input, actions.moveDownParagraph(payload))

        expect(actual.paragraphList[0].text).toEqual('a')
        expect(actual.paragraphList[1].text).toEqual('b')
    })

    test('正常系 入れ替えしない 存在しないid', () => {
        const payload: MoveDownParagraphPayload = {
            paragraphId: 2,
        }
        const actual = reducer(input, actions.moveDownParagraph(payload))

        expect(actual.paragraphList[0].text).toEqual('a')
        expect(actual.paragraphList[1].text).toEqual('b')
    })

    test('正常系 入れ替え成功', () => {
        const payload: MoveDownParagraphPayload = {
            paragraphId: 0,
        }
        const actual = reducer(input, actions.moveDownParagraph(payload))

        expect(actual.paragraphList[0].text).toEqual('b')
        expect(actual.paragraphList[1].text).toEqual('a')
    })
})

describe('changeParagraphMemo', () => {
    test('正常系', () => {
        const previousState: ScenarioModel = createScenario()

        const payload: ChangeParagraphMemoPayload = {
            paragraphId: 0,
            memo: 'hoge',
        }
        const actual = reducer(previousState, actions.changeParagraphMemo(payload))

        const expected: ScenarioModel = createScenario()
        expected.paragraphList[0].memo = 'hoge'

        expect(actual).toEqual(expected)
    })
})
