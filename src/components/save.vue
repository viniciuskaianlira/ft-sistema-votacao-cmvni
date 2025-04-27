<template>
  <div class="container">
    <!-- Cabeçalho -->
    <header class="header">
      <h1>PROJETO DE LEI ORDINÁRIA Nº 1650/2025</h1>
      <h2>FASE ÚNICA DE DISCUSSÕES / PRIMEIRA VOTAÇÃO</h2>
      <p>
        RESULTADO DA VOTAÇÃO:
        <span class="aprovado">APROVADO POR UNANIMIDADE</span>
      </p>
      <p class="quorum">QUORUM MAIORIA SIMPLES</p>
    </header>

    <!-- Conteúdo principal -->
    <div class="main-content">
      <!-- Vereadores -->
      <div class="vereadores">
        <CardVereador />
        <CardVereador />
        <CardVereador />
        <CardVereador />
        <CardVereador />
        <CardVereador />
        <CardVereador />
        <CardVereador />
        <CardVereador />
      </div>

      <!-- Painel lateral -->
      <aside class="painel">
        <div class="escudo">
          <img
              class="escudo_leg"
              src="../assets/escudo_leg.png"
              alt="escudo legislativo"
            />
        </div>
        <div class="camara">
          CÂMARA DE VEREADORES DE<br /><strong>NOVA ITABERABA</strong>
        </div>
        <div class="contadores">
          <div class="box favoravel"><span>4</span> FAVORÁVEL</div>
          <div class="box contrario"><span>4</span> CONTRÁRIO</div>
          <div class="box abstenção"><span>1</span> ABSTENÇÃO</div>
        </div>
        <div class="relogio">00:00:00</div>
      </aside>
    </div>
  </div>
</template>

<script>
  import CardVereador from './CardVereador.vue';

  export default {
    components: {
      CardVereador,
    },
    data() {
      return {
        vereadores: [
          { nome: "ANTONIO", cargo: "PRESIDENTE" }
        ]
      };
    }
  };
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  font-family: sans-serif;
  background: #05246a;
  color: white;
  padding: 1rem;
  min-height: 100vh;
}

.header {
  margin-bottom: 1rem;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.header h2 {
  color: #a8ff6c;
  font-size: 1.2rem;
  font-weight: bold;
}

.aprovado {
  color: #82e859;
}

.quorum {
  font-size: 0.9rem;
  margin-top: 0.2rem;
}

.main-content {
  display: flex;
  gap: 2rem;
}

/* Vereadores */
.vereadores {
  display: grid;
  grid-template-columns: repeat(3, 406px);
  gap: 1.5rem;
}

.card {
  background: #bfcdfd;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  height: 250px;
}

.highlight {
  background: #ffe369;
  height: 40px;
}

.photo img {
  width: 135px;
  height: 120px;
  object-fit: cover;
  background: #dde3ff;
}

.info {
  padding: 0.5rem;
  background: #c7d4ff;
  text-align: center;
  width: 271px;
}

.nome {
  font-weight: bold;
  font-size: 1rem;
}

.cargo {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.partido {
  background: white;
  color: #4caf50;
  font-weight: bold;
  font-size: 0.8rem;
  padding: 0.3rem;
  margin-bottom: 0.3rem;
  border-radius: 4px;
}

.voto {
  background: #27c95d;
  color: white;
  font-weight: bold;
  padding: 0.3rem;
  font-size: 0.8rem;
  border-radius: 4px;
}

/* Painel lateral */
.painel {
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.escudo_leg {
  width: 140px;
}

.escudo {
  border: 1px dashed white;
  height: 120px;
  width: 120px;
  text-align: center;
  line-height: 120px;
  font-size: 0.9rem;
  color: #ccc;
}

.camara {
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.2rem;
}

.contadores {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  font-weight: bold;
  border-radius: 6px;
  font-size: 0.9rem;
  color: white;
}

.favoravel {
  background: #27c95d;
}

.contrario {
  background: #f1453d;
}

.abstenção {
  background: #91a7ff;
}

.relogio {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 2rem;
}
</style>
