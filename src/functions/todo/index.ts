import { handlerPath } from '@libs/handler-resolver';

export const getAllTodos = {
  handler: `${handlerPath(__dirname)}/handler.getAllTodos`,
  events: [
    {
      http: {
        method: 'get',
        path: 'todos/',
      },
    },
  ],
};

export const createTodo = {
  handler: `${handlerPath(__dirname)}/handler.createTodo`,
  events: [
    {
      http: {
        method: 'post',
        path: 'todos',
      },
    },
  ],
};

export const getTodo = {
  handler: `${handlerPath(__dirname)}/handler.getTodo`,
  events: [
    {
      http: {
        method: 'get',
        path: 'todos/{id}',
      },
    },
  ],
};

export const updateTodo = {
  handler: `${handlerPath(__dirname)}/handler.updateTodo`,
  events: [
    {
      http: {
        method: 'put',
        path: 'todos/{id}',
      },
    },
  ],
};

export const deleteTodo = {
  handler: `${handlerPath(__dirname)}/handler.deleteTodo`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'todos/{id}',
      },
    },
  ],
};