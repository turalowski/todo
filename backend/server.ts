import express, { Express, Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();

let todos: Array<Todo> = [
  {
    id: 'todo-1',
    title: 'Todo 1',
    description: 'It\'s todo 1',
    author: 'Tural Hajiyev'
  },
  {
    id: 'todo-2',
    title: 'Todo 2',
    description: 'It\'s todo 2',
    author: 'Tural Hajiyev'
  }
]

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

  input TodoInput {
    title: String!
    description: String!
    author: String!

  }

  type Todo {
  id: String!
  title: String!
  description: String!
  author: String!
  }

  type Mutation {
    addTodo(input: TodoInput): Todo
    updateTodo(id: String!, input: TodoInput): Todo
  }

  type Query {
    getTodos: [Todo]
  }

`);

// The root provides a resolver function for each API endpoint
var root = {
  getTodos: function (): Todo[] {
    return todos;
  },
  addTodo: function (args: { input: TodoInput }): Todo {
    const newTodo = {
      id: `todo-${todos.length + 1}`,
      ...args.input
    }
    console.log(args);

    todos = [...todos, newTodo]
    return newTodo
  },
  updateTodo: function (id: string, input: TodoInput): Todo {
    console.log(input)
    let updatedTodo = {
      id,
      ...input
    }

    console.log(updatedTodo);
    todos.map(todo => {
      if (todo.id === id) {
        return updatedTodo
      }
      return todo;
    })

    return updatedTodo;
  }
};

const app: Express = express();
const port = process.env.PORT;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});