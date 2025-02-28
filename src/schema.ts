// src/schema.ts
import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(text: String!): Todo
    toggleTodoCompleted(id: ID!): Todo
  }
`);
