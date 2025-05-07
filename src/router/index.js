// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView     from '@/views/LoginView.vue'
import { checkAuth } from '@/router/guards'
import DashboardView from '@/views/DashboardView.vue'
import InicioView    from '@/views/InicioView.vue'
import AtoView       from '@/views/AtoView.vue'
import ProjetosView  from '@/views/ProjetosView.vue'
import SessoesView   from '@/views/SessoesView.vue'
import NotFoundView  from '@/views/404View.vue'
// () => import('@/views/MesaDiretoraView.vue')
import MesaDiretora from '@/views/MesaDiretoraView.vue';

function getUser() {
  const raw = localStorage.getItem('user')
  try {
    return raw && raw !== 'undefined'
      ? JSON.parse(raw)
      : null
  } catch (e) {
    console.error('Erro ao fazer parse do user:', e)
    return null
  }
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    beforeEnter: checkAuth,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: '/inicio',
        component: InicioView
      },
      {
        path: '/ato',
        name: 'Ato',
        component: AtoView
      },
      {
        path: '/projetos',
        name: 'Projetos',
        component: ProjetosView
      },
      {
        path: '/sessoes',
        name: 'Sessões',
        component: SessoesView
      },
      {
        path: '/indicacoes',
        name: 'Indicações',
        component: () => import('@/views/IndicacoesView.vue')
      },
      {
        path: '/protocolos',
        name: 'Protocolos',
        component: () => import('@/views/ProtocolosView.vue')
      },
      {
        path: '/vereadores',
        name: 'Vereadores',
        component: () => import('@/views/VereadoresView.vue')
      },
      {
        path: '/mesadiretora',
        name: 'Mesa Diretora',
        component: MesaDiretora
      },
      {
        path: '/legislaturas',
        name: 'Legislaturas',
        component: () => import('@/views/LegislaturasView.vue')
      },
      {
        path: '/proposicoes',
        name: 'Proposições',
        component: () => import('@/views/ProposicoesView.vue')
      },
      {
        path: '/oficios',
        name: 'Ofícios',
        component: () => import('@/views/OficiosView.vue')
      },
      {
        path: '/sessao/:id',
        name: 'SessaoAtiva',
        component: () => import('@/views/SessaoAtivaView.vue'),
        props: true
      },
      {
        path: '/relatorios/votos',
        name: 'RelatorioVotos',
        component: () => import('@/views/RelatorioVotosView.vue')
      },
      {
        path: '/relatorios/presenca',
        name: 'RelatorioPresenca',
        component: () => import('@/views/RelatorioPresencaView.vue')
      },
      {
        path: '/sessoes/presenca',
        name: 'RegistroPresenca',
        component: () => import('@/views/PresencaView.vue')
      },
      {
        path: '/cargos',
        name: 'Cargos',
        component: () => import('@/views/CargosView.vue')
      },
      {
        path: '/oficios/recebidos',
        name: 'Oficios Recebidos',
        component: () => import('@/views/OficiosRecebidosView.vue')
      },
      {
        path: '/oficios/recebidos',
        name: 'Oficios Recebidos',
        component: () => import('@/views/OficiosRecebidosView.vue')
      },
      {
        path: '/configuracoes/usuarios',
        name: 'Usuários',
        component: () => import('@/views/UsuariosView.vue')
      },
      {
        path: '/configuracoes/permissoes',
        name: 'Permissões',
        component: () => import('@/views/PermissoesView.vue')
      },
      {
        path: '/configuracoes/preferencias',
        name: 'Preferências',
        component: () => import('@/views/PreferenciasView.vue')
      },
      {
        path: '/tipos-ato',
        name: 'Tipo Ato',
        component: () => import('@/views/TipoAtosView.vue')
      },
      {
        path: '/tipos-projetos',
        name: 'Tipos Projetos',
        component: () => import('@/views/TiposProjetosView.vue')
      }
      // … outras sub-rotas …
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
    
export default router
