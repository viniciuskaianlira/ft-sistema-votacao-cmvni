# Sistema de Votação - Câmara de Vereadores

> Projeto Full-Stack em Node.js/Express (MySQL) e Vue 3 (Vite, Tailwind CSS)

## 📖 Visão Geral
Sistema de votação para uma câmara de vereadores, com autenticação JWT, controle de permissões por roles, agendamento de sessões legislativas e painel de administração.

## 🚀 Tecnologias

- **Backend**: Node.js, Express, MySQL (mysql2/promise)
- **Frontend**: Vue 3, Vite, Tailwind CSS, Pinia, Vue Router, Axios
- **Autenticação**: JWT (jsonwebtoken)
- **Validação**: express-validator (backend), VeeValidate + Yup (frontend)
- **Real-time**: WebSocket (socket.io opcional)
- **Outras**: Helmet, CORS, Winston/Pino, Swagger/OpenAPI, date-fns

## ⚙️ Estrutura do Projeto

```bash
ft-sistema-votacao-cmvni/
├── .vscode/              # Configurações do editor
├── outros/               # Scripts e utilitários extras
├── public/               # Arquivos estáticos (favicon, index.html)
├── server/               # Backend (Express API)
│   ├── config/
│   │   └── db.js         # Pool MySQL + .env
│   ├── controllers/      # Lógica dos endpoints
│   ├── middleware/       # authenticate.js, authorize.js
│   ├── routes/           # Arquivos de rotas (login, sessao, menu, etc.)
│   ├── utils/            # MENU_MAP, helpers
│   └── server.js         # Setup do app, mount routes, WebSocket
├── src/                  # Frontend (Vue 3 + Vite)
│   ├── assets/           # Imagens, fontes, ícones
│   ├── components/       # Componentes reutilizáveis
│   │   ├── Sidebar.vue
│   │   ├── TopBar.vue
│   │   └── ProximasSessoes.vue # Componente ficará na tela InicioView.vue que deverá buscar no backend as sessões proximas, e deve mostrar só as proximas a data e hora atual.
│   ├── views/            # Telas principais
│   │   ├── LoginView.vue
│   │   ├── DashboardView.vue
│   │   ├── InicioView.vue
│   │   ├── AtoView.vue
│   │   ├── ProjetosView.vue
│   │   ├── SessoesView.vue
│   │   ├── CargosView.vue
│   │   ├── VereadoresView.vue
│   │   └── 404View.vue
│   ├── router/           # Vue Router + guards
│   ├── store/            # Pinia stores (auth, voting, settings)
│   ├── services/         # Axios instances e consumers (api.js, authService.js, etc.)
│   ├── utils/            # formatDate, permissions, validations
│   ├── App.vue           # Componente raiz
│   └── main.js           # Inicialização Vue + plugins
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```


### Requisitos
- Node.js (>=14)
- MySQL/MariaDB

## 📝 Documentação da API
Após iniciar o backend, acesse `http://localhost:3000/api/docs` (Swagger UI)


- Falta aonde implementar uma view com CRUD para users e com modal para adicionar a permissão do usuário.
- Falta aonde implementar uma view com CRUD para as Legislaturas
- Falta aonde implementar uma view com CRUD para as adicionar vereadores (talvés já adicionar junto no CRUD do users com uma caixa para marcar caso ele é um vereador dai já aparece para preencher o restante dos dados do vereador)
- Falta aonde implementar uma view com CRUD para a mesa diretora
- Falta aonde implementar uma view com CRUD para o protocolo
- Falta aonde implementar o registro do historico de protocolos
- Falta aonde implementar uma view com CRUD para as indicações e seus proponentes e arquivos, talvez preencher em um campo o texto da indicação e o proprio sistema gerar o arquivo da indicação.
- Falta aonde implementar uma view com CRUD para tipo de projeto
- Falta aonde implementar uma view com CRUD para projeto e seus proponentes e arquivos
- Falta aonde implementar uma view com CRUD para o tipo de proposição
- Falta aonde implementar uma view com CRUD para a proposicao, seus proponentes e arquivos.
- Falta aonde implementar uma view com CRUD para os atos, tipo de ato, ato proponentes e arquivos.
- Falta aonde implementar uma view com CRUD para os oficios e oficios recebidos
- Falta aonde implementar uma view aonde será a mostrado a sessão para os vereadores, listando a pauta da sessão, o que está sendo discutido, votado e afins, nesta tela se o vereador é o presidente ele terá privilegios para controlar a sessão, como seu inicio, momento da discução, momento da votação, dependendo da ação do presisdente deve atualizar a tela para todos os outros vereadores, no momento da votação deve atualizar o card com o voto de cada vereador no componente PublicoLayout.vue e caso de empate 4 a 4 o presidente poderá dar o voto de desempate que deverá mostrar automaticamente na tela do presidente caso de empate mesmo que o tempo de 30 segundos para registrar o voto não tenha sido finalizado, e caso algum vereador não vote dentro dos 30 segundos e o mesmo está presente será considerado uma abstenção, os vereadores sem o privilegio de presidente poderão pedir vista do projeto durante da discução caso seja necessário deve alterar o banco de dados para guardar essa informação.

- Para o usuario com privilegio de servidor deve aparecer um botão para ele poder abrir em uma nova janela a view PublicoLayout.vue, somente ele e o admin.

- Para o presidente deverá ter a opção de suspender a sessão, encerrar sessão e caso ainda tenha projetos ou outro na fila deve o avisar, a pauta deve ser tratada como uma fila.

- Cada sessão ao ser iniciada deve registrar o horario de inicio de fim.

- Ao fim da sessão deve ser liberado um botão para o usuario com o provilegio de servidor ou admin, para gerar um relatorio da sessão com os votos realizados por cada vereador, e também em outro botão o relatorio de presença na sessão.

- Antes de cada sessão o vereador deverá registrar sua presença, por meio de reconhecimendo facial, quando ele selecionar a sessão na tela de inicio deve ter um botão de registro de presença, só após libera as outras interações para ele.

- Deve também ter uma tela para a secretária poder acessar os arquivos das materias da pauta, porém só terá esse acesso além de poder ver a matéria que está em discução e votação.

- Deverá ter uma tela personalizada para membros do poder executivo poder protocolcar projetos de lei, talves também ter uma permissão personalizada como "Executivo"  algo assim.


como realizei algumas alterações no front e back segue os links atualizados:

Front: https://github.com/viniciuskaianlira/ft-sistema-votacao-cmvni
Backeend: https://github.com/viniciuskaianlira/bk-sistema-votacao-cmvni