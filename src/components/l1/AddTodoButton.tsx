import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { IconButton } from '@mui/material/';
import { Add } from '@mui/icons-material/';

import ScenarioSlice, { AddTodoPayload } from '../../store/ScenarioSlice';


const Main = styled(IconButton)`
    display: flex;
    align-content: center;
    justify-content: center;
`;

type Props = {
    paragraphId: number
}

const App = (props: Props) => {
    const dispatch = useDispatch();

    const add = () => {
        const payload: AddTodoPayload = {
            paragraphId: props.paragraphId,
        }
        dispatch(ScenarioSlice.actions.addTodo(payload));
    }

    return (
        <Main onClick={add}>
            <Add />
        </Main>
    );
};

export default App;
