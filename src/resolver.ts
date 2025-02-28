// 仮のデータストア
let todos = [
  { id: '1', text: 'Learn GraphQL', completed: false },
  { id: '2', text: 'Build a TODO app', completed: false },
];

export const resolvers = {
  todos: () => todos,
  addTodo: ({ text }: { text: string }) => {
    const newTodo = { id: String(todos.length + 1), text, completed: false };
    todos.push(newTodo);
    return newTodo;
  },
  toggleTodoCompleted: ({ id }: { id: string }) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
    return todo;
  },
};
