import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Todo from "../model/todo";

const TableName = "TodosTable";

export default class TodoService {

  constructor(private docClient: DocumentClient) {
  }

  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.docClient.scan({
      TableName,
    }).promise()
    return todos.Items as Todo[];
  }

  async createTodo(todo: Todo): Promise<Todo> {
    await this.docClient.put({
      TableName,
      Item: todo
    }).promise();
    return todo as Todo;
  }

  async getTodo(id: string): Promise<any> {

    const todo = await this.docClient.get({
      TableName,
      Key: {
        todosId: id
      }
    }).promise();
    if (!todo.Item) {
      throw new Error("Id does not exit");
    }
    return todo.Item as Todo;
  }

  async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo> {
    const updated = await this.docClient
      .update({
        TableName,
        Key: { todosId: id },
        UpdateExpression:
          "set #status = :status",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":status": todo.status,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return updated.Attributes as Todo;
  }

  async deleteTodo(id: string): Promise<any> {
    return await this.docClient.delete({
      TableName,
      Key: {
        todosId: id
      }
    }).promise();
  }
}