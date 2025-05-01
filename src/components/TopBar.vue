<template>
    <header class="flex items-center justify-between bg-white shadow px-6 h-16 sticky top-0 z-10">
      <button
        @click="$emit('toggle')"
        aria-label="Toggle Menu"
        class="text-gray-700 md:hidden"
      >
        <i class="fas fa-bars w-6 h-6"></i>
      </button>
      <div class="flex items-center space-x-4">
        <h2 class="text-xl font-semibold">Dashboard</h2>
        <button aria-label="Notificações" class="relative">
          <i class="fas fa-bell w-6 h-6 text-gray-700"></i>
          <span
            v-if="count"
            class="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full"
          >{{ count }}</span>
        </button>
        <button aria-label="Configurações" class="text-gray-700">
          <i class="fas fa-cog w-6 h-6"></i>
        </button>
      </div>
      <div class="flex items-center space-x-4">
        <span class="text-gray-600">{{ currentDate }}</span>
        <button
          @click="$emit('logout')"
          class="flex items-center space-x-1 text-red-600 hover:text-red-700"
        >
          <i class="fas fa-sign-out-alt w-5 h-5"></i>
          <span>Sair</span>
        </button>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    count: { type: Number, default: 0 }
  })
  const emit = defineEmits(['toggle', 'logout'])
  
  const currentDate = computed(() => new Date().toLocaleDateString())
  </script>
  
  <style scoped>
  /* All styling via Tailwind CSS */
  </style>
  