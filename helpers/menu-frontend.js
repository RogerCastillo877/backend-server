const getMenuFrontend = (role) => {
    
    const menu = [
        {
          title: 'Dashboard!!',
          icon: 'mdi mdi-gauge',
          submenu: [
            { title: 'Main', url: '/' },
            { title: 'ProgressBar', url: 'progress' },
            { title: 'Gráficas', url: 'graphic1' },
            { title: 'Promes', url: 'promes' },
            { title: 'Rxjs', url: 'rxjs' },
          ]
        },
        {
          title: 'Maintenance',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            // { title: 'Ususarios', url: 'users' },
            { title: 'Hospitales', url: 'hospitals' },
            { title: 'Médicos', url: 'doctors' }
          ]
        }
      ];

      if( role === 'ADMIN_ROLE' ) {
          menu[1].submenu.unshift({ title: 'Ususarios', url: 'users' })
      }

      return menu;
}

module.exports = {
    getMenuFrontend,
}