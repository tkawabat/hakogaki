import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import { RootState } from '../../store/rootReducer';
import ScenarioSlice, { ChangeMemoPayload } from '../../store/ScenarioSlice';


const Area = styled.textarea`
    height: 100%;
`;

type Props = {
    id: number;
}

const App = (props: Props) => {
    const memo = useSelector((state: RootState) => 
        state.scenario.paragraphList[props.id].memo);
    const dispatch = useDispatch();

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const payload: ChangeMemoPayload = {
            paragraphId: props.id,
            memo: e.target.value
        }
        dispatch(ScenarioSlice.actions.changeMemo(payload));
    }

    return (
        <Area
            placeholder="メモを入力"
            onChange={onChange}
            value={memo}
        />
    );
};

export default App;
