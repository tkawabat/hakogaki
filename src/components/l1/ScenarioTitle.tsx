import React from 'react';
import { useDispatch, } from "react-redux";
import styled from 'styled-components';
import { TextField } from '@mui/material/';

import ScenarioSlice, { ChangeTitlePayload } from '../../store/ScenarioSlice';


type Props = {
    title: string;
}

const Area = styled(TextField)`
`;

const App = (props: Props) => {
    const dispatch = useDispatch();

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const payload: ChangeTitlePayload = {
            title: e.target.value
        }
        dispatch(ScenarioSlice.actions.changeTitle(payload));
    }

    return (
        <Area
            variant='standard'
            className='scenarioTitle'
            placeholder='作品タイトル'
            onChange={onChange}
            value={props.title}
            {...props}
        />
    );
};

export default App;
