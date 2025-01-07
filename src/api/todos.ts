import type { Todo } from '@/interfaces/Todo';
import { client } from '@/utils/httpClient';
const USER_ID = 1633;

export async function getTodos() {
  return client.get(`/todos?userId=${USER_ID}`);
}

export async function createTodo(title: string) {
  return client.post('/todos', {
    title,
    userId: USER_ID,
    completed: false,
  });
}

export async function updateTodo({ id, title, completed }: Todo) {
  return client.patch(`/todos/${id}`, {
    title,
    completed,
  });
}

export async function deleteTodo(id: number) {
  return client.delete(`/todos/${id}`);
}
