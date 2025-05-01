<template>
  <div class="flex h-screen">
    <Sidebar
      :show="showSidebar"
      @toggle="toggleSidebar"
      @logout="logout"
    />

    <!-- Overlay for mobile when sidebar open -->
    <div
      v-if="showSidebar"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
    />

    <div
      class="flex-1 flex flex-col"
      :class="{ 'ml-64': showSidebar, 'ml-16': !showSidebar }"
      style="transition: margin 0.3s ease-in-out;"
    >
      <TopBar
        :count="notificationCount"
        @toggle="toggleSidebar"
        @logout="logout"
      />

      <main class="flex-1 overflow-auto p-6 bg-gray-50">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '@/components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'
import { fetchMenu } from '@/services/menuService.js'

// State management
const showSidebar = ref(true)
const notificationCount = ref(3) // Exemplo fixo; pode vir de API

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

function logout() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  // Redireciona para login
  window.location.href = '/'
}
</script>

<style scoped>
/* Sem estilos adicionais; tudo via Tailwind */
</style>
