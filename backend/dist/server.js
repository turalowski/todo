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
// Construct a schema, using GraphQL schema language
const schema = (0, graphql_1.buildSchema)(`
  type Query {
    hello: String
  }
`);
// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
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
