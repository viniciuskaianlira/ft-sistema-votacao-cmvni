export const roles = {
    PRESIDENTE: 'presidente',
    VEREADOR: 'vereador',
    SECRETARIO: 'secretario',
    ADMIN: 'admin'
  };
  
  export const permissions = {
    [roles.PRESIDENTE]: ['votar', 'abrirSessao', 'fecharSessao', 'gerenciarUsuarios'],
    [roles.VEREADOR]: ['votar', 'verResultados'],
    [roles.SECRETARIO]: ['verResultados', 'prepararPauta'],
    [roles.ADMIN]: ['gerenciarSistema', 'gerenciarUsuarios']
  };
  