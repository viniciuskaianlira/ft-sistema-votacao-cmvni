<template>
  <div class="card">
    <div class="image-section">
      <img src="./src/assets/antonio.jpeg" alt="Antonio Carlos Flores" />
    </div>
    <div class="info-section">
      <h1>ANTONIO CARLOS FLORES</h1>
      <h2>VEREADOR</h2>
      
    </div>
    <div class="party-status">
        <span class="party">PL</span>
    </div>  
    <div class="status-votacao">
      <span :class="statusClass">{{ statusText }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        status: 'favoravel' // 'favoravel', 'contrario', 'abstencao', 'ausente'
      };
    },
    computed: {
      statusClass() {
        return {
          favoravel: this.status === 'favoravel',
          contrario: this.status === 'contrario',
          abstencao: this.status === 'abstencao',
          ausente: this.status === 'ausente'
        };
      },
      statusText() {
        switch (this.status) {
          case 'favoravel':
            return 'FAVORÁVEL';
          case 'contrario':
            return 'CONTRÁRIO';
          case 'abstencao':
            return 'ABSTENÇÃO';
          case 'ausente':
            return 'AUSENTE';
          default:
            return '';
        }
      }
    }
  };
</script>

<style scoped>
  .card {
    display: flex;
    flex-direction: row;
    background-color: #f5f5f5; /* Fundo neutro */
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .image-section img {
    width: 135px;
    height: 200px;
    display: flex;
    flex-direction: row;
  }

  .info-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: 0px;
    height: 200px;
  }

  .status-votacao {
    display: flex;
    flex-direction: column;
  }

  h1, h2 {
    margin: 0;
    padding: 0px;
    color: white;
    background-color: purple; /* Fundo fixo para o nome e título */
  }

  .party-status {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .party {
    margin-right: 10px;
    padding: 5px;
    color: green;
    border: 1px solid green;
    border-radius: 5px;
  }

  .favoravel {
    width: 406px;
    height: 50px;
    color: white;
    background-color: green;
    border-radius: 5px;
  }

  .contrario {
    width: 406px;
    height: 50px;
    color: white;
    background-color: red;
    border-radius: 5px;
  }

  .abstencao {
    width: 406px;
    height: 50px;
    color: white;
    background-color: lightblue;
    border-radius: 5px;
  }

  .ausente {
    width: 406px;
    height: 50px;
    color: white;
    background-color: lightgray;
    border-radius: 5px;
  }
</style>
