<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { createTodo, deleteTodo, getTodos, updateTodo } from './api/todos';
import type { Todo } from './interfaces/Todo';
import StatusFilter from './components/StatusFilter.vue';
import { FilterType } from './enums/FilterType';
import TodoItem from './components/TodoItem.vue';

import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

const toast = useToast();

const data = reactive<Todo[]>([]);

const status = ref(FilterType.ALL);
const title = ref('');

function activeTodos() {
  return data.filter((todo) => !todo.completed);
}

function completedTodos() {
  return data.filter((todo) => todo.completed);
}

const visibleData = () => {
  switch (status.value) {
    case FilterType.ALL:
      return data;
    case FilterType.COMPLETED:
      return completedTodos();
    case FilterType.ACTIVE:
      return activeTodos();
  }
};

function handleToggleComplete() {
  activeTodos().forEach((todo) => handleToggle(todo));
}

const showError = (message: string) => {
  toast.add({
    severity: 'error',
    summary: 'ERROR',
    detail: message,
    life: 3000,
  });
};

function handleClearAll() {
  const completed = completedTodos();

  completed.forEach((todo) => handleTodoDelete(todo.id));
  data.splice(0, data.length, ...activeTodos());
}

function handleToggle(todo: Todo) {
  handleTodoUpdate({ ...todo, completed: !todo.completed });
}

async function fetchTodos() {
  try {
    const response = await getTodos();
    data.push(...response.data);
  } catch (e) {
    showError(`Failed to fetch todos: ${e}`);
  }
}

async function handleTodoUpdate(todo: Todo) {
  try {
    const response = await updateTodo(todo);

    data.splice(
      0,
      data.length,
      ...data.map((todo) =>
        todo.id !== response.data.id ? todo : response.data,
      ),
    );
  } catch (e) {
    showError(`Failed to update todo: ${e}`);
  }
}

async function handleTodoDelete(id: number) {
  try {
    await deleteTodo(id);
    data.splice(0, data.length, ...data.filter((todo) => todo.id !== id));
  } catch (e) {
    showError(`Failed to delete todo: ${e}`);
  }
}

async function handleTodoCreation() {
  if (!title.value.trim()) {
    showError(`Title should not be empty`);
    return;
  }

  try {
    const response = await createTodo(title.value);

    data.push(response.data);
    title.value = '';
  } catch (e) {
    showError(`Failed to create todo: ${e}`);
  }
}

onMounted(() => {
  fetchTodos();
});
</script>

<template>
  <Toast />
  <div class="flex items-center justify-center">
    <div class="flex w-540 flex-col justify-center gap-64">
      <div class="mt-72 flex items-center justify-between">
        <header class="text-5xl font-bold tracking-widest text-white">
          TODO
        </header>
      </div>

      <main>
        <div class="relative flex flex-col gap-24">
          <div class="group">
            <div
              class="flex h-64 items-center justify-start gap-24 rounded-lg border-2 border-dark-blue bg-dark-blue px-18 py-24 duration-300 group-hover:translate-y-4 group-hover:scale-105 group-hover:border-blue group-hover:shadow-xl"
            >
              <button
                type="button"
                class="h-24 w-24 font-bold transition-all duration-300 hover:text-blue"
                :class="{
                  'text-blue': completedTodos().length === data.length,
                }"
                @click="handleToggleComplete()"
                :disabled="completedTodos().length === data.length"
              >
                {{ `&#x2714;` }}
              </button>
              <form @:submit.prevent="handleTodoCreation()" class="flex-1">
                <input
                  class="w-full border-none bg-dark-blue p-[0px] text-xl caret-blue focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="What needs to be done?"
                  autofocus
                  v-model="title"
                />
              </form>
            </div>
          </div>

          <section>
            <ul>
              <TransitionGroup name="list" tag="section">
                <TodoItem
                  v-for="todo of visibleData()"
                  :key="todo.id"
                  :todo="todo"
                  @toggle="handleToggle"
                  @delete="handleTodoDelete"
                  @update="handleTodoUpdate"
                />
              </TransitionGroup>
            </ul>
          </section>
        </div>
        <footer
          v-if="data.length"
          class="flex h-48 items-center justify-between rounded-b-lg bg-dark-blue px-24 text-light-gray"
        >
          <span>{{ activeTodos().length }} items left</span>

          <StatusFilter v-model="status" />

          <button
            class="transition-all duration-300 hover:text-white"
            @click="handleClearAll()"
            v-if="completedTodos().length"
          >
            Clear Completed
          </button>
        </footer>
      </main>
    </div>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  max-height: 60px;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scaleY(0);
}
</style>
