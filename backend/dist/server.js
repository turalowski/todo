"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let todos = [
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
];
// Construct a schema, using GraphQL schema language
const schema = (0, graphql_1.buildSchema)(`

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
    getTodos: function () {
        return todos;
    },
    addTodo: function (args) {
        const newTodo = Object.assign({ id: `todo-${todos.length + 1}` }, args.input);
        console.log(args);
        todos = [...todos, newTodo];
        return newTodo;
    },
    updateTodo: function (id, input) {
        console.log(input);
        let updatedTodo = Object.assign({ id }, input);
        console.log(updatedTodo);
        todos.map(todo => {
            if (todo.id === id) {
                return updatedTodo;
            }
            return todo;
        });
        return updatedTodo;
    }
};
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
