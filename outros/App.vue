<template>
  <div id="app">
    <!-- Chama o componente PublicoLayout -->
    <PublicoLayout />
  </div>
</template>

<script>
import PublicoLayout from './PublicoLayout.vue';

export default {
  name: 'App',
  components: {
    PublicoLayout
  }
};
</script>

<style>
  /* Estilos globais do App (opcional) */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 0px;
  }
</style>
