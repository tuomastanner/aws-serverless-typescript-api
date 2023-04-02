import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 } from "uuid";
import { todoService } from '../../service/index';
import Todo from 'src/model/todo';

export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const todos = await todoService.getAllTodos();
  return formatJSONResponse({
    todos
  })
});

export const createTodo = middyfy(async (event: APIGatewayProxyEvent & { body: Todo }): Promise<APIGatewayProxyResult> => {
  try {
    const id = v4();
    const todo = await todoService.createTodo({
      todosId: id,
      title: event.body.title,
      description: event.body.description,
      createdAt: new Date().toISOString(),
      status: false
    })
    return formatJSONResponse({
      todo
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    });
  }
});

export const updateTodo = middyfy(async (event: APIGatewayProxyEvent & { body: Partial<Todo> }): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;
  try {
    const todo = await todoService.updateTodo(id, event.body)
    return formatJSONResponse({
      todo, id
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    });
  }
});

export const getTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;
  try {
    const todo = await todoService.getTodo(id)
    return formatJSONResponse({
      todo, id
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    });
  }
});

export const deleteTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;
  try {
    const todo = await todoService.deleteTodo(id)
    return formatJSONResponse({
      todo, id
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    });
  }
});