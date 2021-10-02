import React from 'react';
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { Tooltip, IconButton, TextField, Checkbox } from '@mui/material/';
import { Delete } from '@mui/icons-material/';

import ScenarioSlice, { ChangeTodoTextPayload, DeleteTodoPayload, ToggleTodoPayload } from '../../store/ScenarioSlice';
import TodoModel from '../../store/model/TodoModel';


const Main = styled.div`
    display: flex;
    align-self: flex-start;
    width: 100%;
`;

const TodoTextField = styled(TextField)`
    width: 100%;
`;

export interface TodoProps {
    paragraphId: number;
    todoId: number;
    todo: TodoModel;
}

const App = (props: TodoProps) => {
    const dispatch = useDispatch();

    const toggle = ()=> {
        const payload: ToggleTodoPayload = {
            paragraphId: props.paragraphId,
            todoId: props.todoId,
        }
        dispatch(ScenarioSlice.actions.toggleTodo(payload));
    }

    const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const payload: ChangeTodoTextPayload = {
            paragraphId: props.paragraphId,
            todoId: props.todoId,
            text: e.target.value,
        }
        dispatch(ScenarioSlice.actions.changeTodoText(payload));
    }

    const deleteTodo = ()=> {
        const payload: DeleteTodoPayload = {
            paragraphId: props.paragraphId,
            todoId: props.todoId,
        }
        dispatch(ScenarioSlice.actions.deleteTodo(payload));
    }
    
    return (
        <Main>
            <Tooltip title="完了" arrow>
                <Checkbox checked={props.todo.checked} onClick={toggle} />
            </Tooltip>
            <TodoTextField
                variant="standard"
                placeholder={"Todo"}
                value={props.todo.text}
                onChange={changeText}
            />
            <Tooltip title="Todoを削除" arrow>
            <IconButton
                size={'small'}
                onClick={deleteTodo}
            >
                <Delete />
            </IconButton>
        </Tooltip>
            

        </Main>
    );
};

export default App;