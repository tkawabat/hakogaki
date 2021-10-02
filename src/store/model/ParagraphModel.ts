import TodoModel, { createTodo } from './TodoModel';


export default interface ParagraphModel {
    subTitle: string;
    text: string;
    memo: string;
    todo: TodoModel[];
}

export const createParagraph = () :ParagraphModel => {
    return {
        subTitle: '',
        text: '',
        memo: '',
        todo: [
            createTodo(),
            createTodo(),
            createTodo(),
        ]
    }
}