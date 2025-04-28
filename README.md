src/
├── assets/           # Imagens, ícones, fontes
├── components/       # Componentes reutilizáveis (Botões, Cards, Modals, etc)
│   ├── layouts/      # Layouts: NavBar, SideBar, Footer
│   ├── forms/        # Componentes de formulários (Inputs, Selects, etc)
│   ├── modals/       # Modais genéricos
│   ├── tables/       # Tabelas reutilizáveis
│   └── voting/       # Componentes específicos para votação
├── views/            # Telas principais (rotas)
│   ├── LoginView.vue
│   ├── DashboardView.vue
│   ├── VotacaoView.vue
│   ├── SessaoView.vue
│   ├── CargosView.vue
│   ├── VereadoresView.vue
│   ├── UsuariosView.vue
│   ├── ProjetosView.vue
│   └── 404View.vue
├── router/           # Configuração das rotas (Vue Router)
│   ├── index.js
│   └── guards.js     # Middleware de rotas para proteger acesso
├── store/            # Gerenciamento de estado (Pinia ou Vuex)
│   ├── auth.js       # Usuário logado, token JWT, roles
│   ├── voting.js     # Estado das votações em tempo real
│   └── settings.js   # Configurações globais
├── services/         # Consumo da API (axios)
│   ├── api.js        # Instância configurada do axios
│   ├── authService.js
│   ├── cargosService.js
│   ├── votacaoService.js
│   └── usuariosService.js
├── utils/            # Utilitários gerais
│   ├── formatDate.js
│   ├── permissions.js
│   └── validations.js
├── App.vue           # Componente raiz
├── main.js           # Arquivo principal que inicializa o app
└── style/            # Estilos globais (TailwindCSS, SCSS ou CSS)
    └── main.css
