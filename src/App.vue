<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { createTodo, deleteTodo, getTodos, updateTodo } from './api/todos';
import type { Todo } from './interfaces/Todo';
import { FilterType } from './enums/FilterType';

const data = reactive<Todo[]>([]);
const error = reactive({
  isError: false,
  errorType: '',
});
const isLoading = ref(false);
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

function handleFilterChange(newFilter: FilterType) {
  status.value = newFilter;
}

function handleClearAll() {
  const completed = completedTodos();

  completed.forEach((todo) => handleTodoDelete(todo.id));
  data.splice(0, data.length, ...activeTodos());
}

function handleToggle(todo: Todo) {
  handleTodoUpdate({ ...todo, completed: !todo.completed });
}

async function fetchTodos() {
  isLoading.value = true;
  try {
    const response = await getTodos();
    data.push(...response.data);
  } catch (e) {
    error.errorType = `Failed to fetch todos: ${e}`;
  }
}

async function handleTodoUpdate(todo: Todo) {
  isLoading.value = true;
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
    error.errorType = `Failed to fetch todos: ${e}`;
  }
}

async function handleTodoDelete(id: number) {
  isLoading.value = true;
  try {
    await deleteTodo(id);
    data.splice(0, data.length, ...data.filter((todo) => todo.id !== id));
  } catch (e) {
    error.errorType = `Failed to fetch todos: ${e}`;
  }
}

async function handleTodoCreation() {
  isLoading.value = true;

  if (!title.value.trim()) {
    error.errorType = `Title should not be empty`;

    return;
  }

  try {
    const response = await createTodo(title.value);

    data.push(response.data);
  } catch (error) {
    console.error('Failed to add todo:', error);
  }

  title.value = '';
}

onMounted(() => {
  fetchTodos();
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="flex w-540 flex-col justify-center gap-64">
      <div class="mt-72 flex items-center justify-between">
        <header class="text-5xl font-bold tracking-widest text-white">
          TODO
        </header>
        <button
          class="h-[26px] w-[26px] bg-icon-light transition-all duration-500 hover:scale-105"
        ></button>
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
              <form @:submit.prevent="handleTodoCreation()">
                <input
                  class="border-none bg-dark-blue p-[0px] text-xl caret-blue focus:outline-none focus:ring-0"
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
                <li
                  class="group flex h-64 items-center justify-between gap-24 border-b-2 border-dark-gray bg-dark-blue px-18 py-24 duration-300 first:rounded-t-lg hover:border-blue"
                  v-for="todo of visibleData()"
                  :key="todo.id"
                  :todo="todo"
                >
                  <div class="flex items-center gap-24">
                    <input
                      type="checkbox"
                      class="h-24 w-24 cursor-pointer rounded-xl border-light-gray bg-dark-blue"
                      :checked="todo.completed"
                      @change="handleToggle(todo)"
                    />

                    <span class="w-full text-xl">{{ todo.title }}</span>
                  </div>

                  <button
                    @click="handleTodoDelete(todo.id)"
                    class="h-18 w-18 bg-icon-close text-light-gray opacity-0 transition-all duration-300 group-hover:opacity-100"
                  ></button>
                </li>
              </TransitionGroup>
            </ul>
          </section>
        </div>

        <footer v-if="data.length">
          <div
            class="flex h-48 items-center justify-between rounded-b-lg bg-dark-blue px-24 text-light-gray"
          >
            <span>{{ activeTodos().length }} items left</span>
            <ul class="flex justify-between gap-18">
              <li v-for="type of Object.values(FilterType)" :key="type">
                <button
                  class="Font transition-all duration-300 hover:text-white"
                  :class="{ 'text-blue': status === type }"
                  @click="handleFilterChange(type)"
                >
                  {{ type }}
                </button>
              </li>
            </ul>

            <button
              class="transition-all duration-300 hover:text-white"
              @click="handleClearAll()"
              v-if="completedTodos().length"
            >
              Clear Completed
            </button>
          </div>
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
