import TodoModel, { createTodo } from './TodoModel'

export default interface ParagraphModel {
    checked: boolean
    subTitle: string
    text: string
    memo: string
    todo: TodoModel[]
}

export const createParagraph = (): ParagraphModel => {
    return {
        checked: false,
        subTitle: '',
        text: '',
        memo: '',
        todo: [createTodo(), createTodo(), createTodo()],
    }
}
