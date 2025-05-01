<template>
    <aside
      :class="[
        'fixed inset-y-0 left-0 bg-gray-100 p-4 flex flex-col justify-between transition-all duration-300 ease-in-out z-30 overflow-hidden',
        show ? 'w-64' : 'w-16'
      ]"
    >
      <!-- Toggle Button -->
      <button
        @click="$emit('toggle')"
        aria-label="Toggle Menu"
        class="absolute top-4 right-4 text-gray-700"
      >
        <svg v-if="show" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
  
      <!-- Content -->
      <div :class="show ? 'mt-0' : 'mt-12'">
        <div v-if="show" class="mb-8">
          <p class="text-lg font-semibold">Bem-vindo, {{ user.nome }}</p>
          <p class="text-sm text-gray-600 capitalize">Cargo: {{ user.role }}</p>
        </div>
        <nav>
          <ul>
            <li v-for="item in menuItems" :key="item.label" class="mb-1">
              <div
                @click="item.children ? toggleSubmenu(item) : navigate(item.path)"
                class="flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer text-gray-800"
              >
                <i :class="[item.icon, 'w-6 h-6']"></i>
                <span v-if="show" class="ml-3">{{ item.label }}</span>
                <svg
                  v-if="item.children"
                  :class="['ml-auto w-4 h-4 transition-transform', { 'rotate-90': isOpen(item) }]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <ul v-if="item.children && isOpen(item)" class="pl-8 space-y-1">
                <li
                  v-for="sub in item.children"
                  :key="sub.label"
                  @click="navigate(sub.path)"
                  class="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  <i :class="[sub.icon, 'w-5 h-5']"></i>
                  <span v-if="show" class="ml-2">{{ sub.label }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { fetchMenu } from '@/services/menuService.js'
  import { useRouter } from 'vue-router'
  
  const props = defineProps({
    show: { type: Boolean, default: true }
  })
  const emit = defineEmits(['toggle', 'logout'])
  const menuItems = ref([])
  const user = ref(JSON.parse(localStorage.getItem('user')) || {})
  const openItems = ref([])
  const router = useRouter()
  
  onMounted(async () => {
    try {
      menuItems.value = await fetchMenu()
    } catch {
      menuItems.value = []
    }
  })
  
  function navigate(path) {
    router.push(path)
  }
  
  function toggleSubmenu(item) {
    const idx = openItems.value.indexOf(item.label)
    if (idx >= 0) openItems.value.splice(idx, 1)
    else openItems.value.push(item.label)
  }
  
  function isOpen(item) {
    return openItems.value.includes(item.label)
  }
  </script>
  
  <style scoped>
  /* All styling via Tailwind CSS */
  </style>
  