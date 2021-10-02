import React from 'react';
import styled from 'styled-components';

import TodoModel from '../../store/model/TodoModel';

import AddTodoButton from '../l1/AddTodoButton';
import Todo from '../l2/Todo';


const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

type Props = {
    paragraphId: number;
    todoList: TodoModel[];
}

const App = (props: Props) => {
    const todo = props.todoList.map((e, i) => {
        return (<Todo paragraphId={props.paragraphId} todoId={i} todo={e} key={i} />);
    });
    
    return (
        <Root className="todoArea">
            {todo}
            <AddTodoButton paragraphId={props.paragraphId}/>
        </Root>
    );
};

export default App;