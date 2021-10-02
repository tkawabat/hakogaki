import React from 'react';

import TodoModel, { createTodo } from '../../store/model/TodoModel';

import TodoArea from './TodoArea';

export default {
    title: 'l3/TodoArea',
    component: TodoArea,
};

export const show = () => {
    const todoList: TodoModel[] = [
        createTodo(),
        createTodo(),
    ];
    return (<TodoArea paragraphId={0} todoList={todoList} />);
}
