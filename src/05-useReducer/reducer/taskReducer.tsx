import * as z from 'zod/v4'

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskState {
    todos: Todo[];
    length: number;
    completed: number;
    pending: number;
}

const TodoSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean(),
});

const TaskStateSchema = z.object({
    todos: z.array(TodoSchema),
    length: z.number(),
    completed: z.number(),
    pending: z.number(),
});

export type TaskAction =
    { type: 'ADD_TODO'; payload: string; }
    | { type: 'TOGGLE_TODO', payload: number; }
    | { type: 'DELETE_TODO', payload: number; };

export const getTaskInitialState = (): TaskState => {
    const localStorageState = localStorage.getItem('task-state');

    if (!localStorageState)
        return {
            todos: [],
            length: 0,
            completed: 0,
            pending: 0,
        };

    const result = TaskStateSchema.safeParse(JSON.parse(localStorageState));

    if (result.error) {
        console.log(result.error);

        return {
            todos: [],
            length: 0,
            completed: 0,
            pending: 0,
        };
    }

    return result.data;
}

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case 'ADD_TODO': {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            }

            // NO SOBREESCRIBIR EL state
            // SE DEBE RETORNAR UN state COMPLETAMENTE NUEVO

            const newTodosLength = state.todos.length + 1;

            return { ...state, todos: [ ...state.todos, newTodo ], length: newTodosLength, pending: newTodosLength };
        }
        case 'DELETE_TODO': {
            const updatedTodos = state.todos.filter(todo => todo.id !== action.payload);
            const todosCompleted = updatedTodos.filter(todo => todo.completed).length;
            const todosIncompleted = updatedTodos.length - todosCompleted;

            return { ...state, todos: updatedTodos, length: updatedTodos.length, completed: todosCompleted, pending: todosIncompleted };
        }
        case 'TOGGLE_TODO': {
            const updatedTodos = state.todos.map(todo => {
                if (todo.id === action.payload)
                    return { ...todo, completed: !todo.completed };

                return todo;
            });

            const todosCompleted = updatedTodos.filter(todo => todo.completed).length;
            const todosIncompleted = updatedTodos.length - todosCompleted;

            return { ...state, todos: updatedTodos, completed: todosCompleted, pending: todosIncompleted };
        }
        default:
            return state;
    }
}
