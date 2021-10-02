

export default interface Todo {
    text: string;
    checked: boolean;
}

export const createTodo = (): Todo => {
    return {
        text: '',
        checked: false,
    }
}