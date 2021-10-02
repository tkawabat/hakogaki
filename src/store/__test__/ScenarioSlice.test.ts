import sinon from 'sinon';

import ScenarioSlice, { ChangeMemoPayload } from '../ScenarioSlice';
import ScenarioModel, { createScenario } from '../model/ScenarioModel';

const reducer = ScenarioSlice.reducer;
const actions = ScenarioSlice.actions;


// test('should return the initial state', () => {
//   expect(ScenarioSlice.reducer(undefined, {})).toEqual([
//     {
//       text: 'Use Redux',
//       completed: false,
//       id: 0
//     }
//   ])
// })

test('changeMemo 正常系', () => {
    const previousState: ScenarioModel = createScenario();

    const payload: ChangeMemoPayload = {
        paragraphId: 0,
        memo: 'hoge'
    }
    const actual = reducer(previousState, actions.changeMemo(payload));

    const expected: ScenarioModel = createScenario();
    expected.paragraphList[0].memo = 'hoge';

    expect(actual).toEqual(expected)
})
