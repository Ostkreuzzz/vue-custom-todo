<script setup lang="ts">
import { FilterType } from '@/enums/FilterType';
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['update:modelValue']);
const { modelValue } = defineProps({ modelValue: String });
</script>

<template>
  <ul class="flex justify-between gap-18">
    <li v-for="type of Object.values(FilterType)" :key="type">
      <button
        class="Font transition-all duration-300 hover:text-white"
        :class="{ 'text-blue': modelValue === type }"
        @click="emit('update:modelValue', type)"
      >
        {{ type }}
      </button>
    </li>
  </ul>
</template>
