import React from 'react';
import { useDispatch, } from "react-redux";
import styled from 'styled-components';

import ScenarioSlice, { ChangeTextPayload } from '../../store/ScenarioSlice';


type Props = {
    paragraphId: number;
    text: string;
}

const Area = styled.textarea`
    height: 400px;
`;

const App = (props: Props) => {
    const dispatch = useDispatch();

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const payload: ChangeTextPayload = {
            paragraphId: props.paragraphId,
            text: e.target.value
        }
        dispatch(ScenarioSlice.actions.changeText(payload));
    }

    return (
        <Area
            placeholder="本文を入力"
            onChange={onChange}
            value={props.text}
        />
    );
};

export default App;
