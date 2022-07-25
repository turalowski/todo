type Todo = {
    id: string
    title: string,
    description: string,
    author: String,
}

type TodoInput = Pick<Todo, "title" | "description" | "author">