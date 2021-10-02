import React from 'react';

import TodoModel from '../../store/model/TodoModel';
import Todo from './Todo';

export default {
    title: 'l2/Todo',
    component: Todo,
};

export const show = () => {
    const todo: TodoModel = {
        checked: false,
        text: 'hoge',
    }

    return (<Todo paragraphId={0} todoId={0} todo={todo} />);
}
