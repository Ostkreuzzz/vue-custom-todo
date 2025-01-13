<script setup lang="ts">
import { ref, nextTick } from 'vue';
import type { Todo } from '../interfaces/Todo';
import 'primeicons/primeicons.css';

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits(['delete', 'update', 'toggle']);

const isEditing = ref(false);
const isLoading = ref(false);

const newTitle = ref(props.todo.title);
const titleField = ref<HTMLInputElement | null>(null);

const startEditing = async () => {
  newTitle.value = props.todo.title;
  isEditing.value = true;

  await nextTick();

  if (titleField.value) {
    titleField.value.focus();
  }
};

function saveEdit() {
  isLoading.value = true;

  isEditing.value = false;

  if (newTitle.value === props.todo.title) {
    return;
  }
  if (newTitle.value.trim()) {
    emit('update', { ...props.todo, title: newTitle.value.trim() });
  } else {
    emit('delete', props.todo.id);
    return;
  }
  isLoading.value = false;
}
</script>

<template>
  <li
    @dblclick="startEditing"
    :class="{ 'border-white': isEditing }"
    class="group flex h-64 items-center justify-between gap-24 border-b-2 border-dark-gray bg-dark-blue px-18 py-24 duration-300 first:rounded-t-lg hover:border-blue"
  >
    <div class="flex items-center gap-24">
      <i
        v-if="isEditing"
        class="pi pi-spin pi-spinner"
        style="font-size: 24px"
      ></i>

      <input
        v-else
        type="checkbox"
        class="h-24 w-24 cursor-pointer rounded-xl border-light-gray bg-dark-blue"
        :checked="todo.completed"
        @change="emit('toggle', todo)"
      />

      <span v-if="!isEditing" class="w-full text-xl">{{ todo.title }}</span>

      <form v-else class="flex-1" @submit.prevent="saveEdit">
        <input
          ref="titleField"
          class="border-none bg-dark-blue p-[0px] text-xl caret-blue focus:outline-none focus:ring-0"
          type="text"
          placeholder="Empty todo will be deleted"
          v-model.trim="newTitle"
          @blur="saveEdit"
          @keyup.esc="isEditing = false"
        />
      </form>
    </div>

    <button
      v-if="!isEditing"
      @click="emit('delete', todo.id)"
      class="h-18 w-18 bg-icon-close text-light-gray opacity-0 transition-all duration-300 group-hover:opacity-100"
    ></button>
  </li>
</template>
