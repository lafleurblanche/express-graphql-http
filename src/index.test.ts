// src/index.test.ts
import request from 'supertest';
import app from './index';

afterAll(() => {
  app.close();
});

describe('GraphQL API', () => {
  it('should fetch todos', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          query {
            todos {
              id
              text
              completed
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.todos).toBeDefined();
    expect(response.body.data.todos.length).toBeGreaterThan(0);
  });

  it('should add a new todo', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            addTodo(text: "New Todo") {
              id
              text
              completed
            }
          }
        `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.addTodo).toBeDefined();
    expect(response.body.data.addTodo.text).toBe("New Todo");
    expect(response.body.data.addTodo.completed).toBe(false);
  });

  it('should toggle todo completed status', async () => {
    const addResponse = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            addTodo(text: "Toggle Todo") {
              id
              text
              completed
            }
          }
        `,
      });

    const todoId = addResponse.body.data.addTodo.id;

    const toggleResponse = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            toggleTodoCompleted(id: "${todoId}") {
              id
              completed
            }
          }
        `,
      });

    expect(toggleResponse.status).toBe(200);
    expect(toggleResponse.body.data.toggleTodoCompleted).toBeDefined();
    expect(toggleResponse.body.data.toggleTodoCompleted.completed).toBe(true);
  });
});
