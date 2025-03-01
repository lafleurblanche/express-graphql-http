// src/index.ts
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema';
import { resolvers } from './resolver';
import cors from 'cors';

const app = express();

// CORSを有効にする
app.use(cors());

app.all('/graphql', createHandler({
  schema: schema,
  rootValue: resolvers,
}));


app.listen(4000, () => console.log('Server running on http://localhost:4000/graphql'));
