import express, { Express, Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();


// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
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