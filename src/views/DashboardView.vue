<template>
  <div class="dashboard-container">
    <aside class="sidebar">
      <div class="user-info">
        <p>Bem-vindo, {{ user.nome }}</p>
        <p class="role">Cargo: {{ capitalize(user.role) }}</p>
      </div>
      <nav class="menu">
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.label"
            @click="navigate(item.path)"
            class="menu-item"
          >
            {{ item.label }}
          </li>
        </ul>
      </nav>
      <button class="logout-btn" @click="logout">Sair</button>
    </aside>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchMenu } from '@/services/menuService.js';  // serviço que consome /api/menu

// Função para capitalizar texto
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const router = useRouter();
const user = ref(JSON.parse(localStorage.getItem('user')) || {});
const menuItems = ref([]);

onMounted(async () => {
  try {
    menuItems.value = await fetchMenu();
  } catch (err) {
    console.error('Falha ao carregar menu:', err);
    menuItems.value = [];
  }
});

function navigate(path) {
  router.push(path);
}

function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  router.push('/');
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 240px;
  background: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.user-info {
  margin-bottom: 2rem;
}

.role {
  font-size: 0.9em;
  color: #555;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 4px;
}

.menu-item:hover {
  background: #ddd;
}

.logout-btn {
  padding: 10px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #c0392b;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>