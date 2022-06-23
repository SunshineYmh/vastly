export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/fwgl',
    name: 'fwgl',
    icon: 'appstore',
    routes: [
      {
        path: '/fwgl',
        icon: 'cluster',
        redirect: '/fwgl/Gateway',
      },
      {
        name: 'Gateway',
        icon: 'apartment',
        path: '/fwgl/Gateway',
        component: './fwgl/Gateway',
      },
      {
        name: 'Jkzc',
        icon: 'apartment',
        path: '/fwgl/Jkzc',
        component: './fwgl/Jkzc',
      },
    ],
  },
  // {
  //   path: '/Gateway',
  //   name: 'Gateway',
  //   icon: 'crown',
  //   component: './fwgl/Gateway',
  // },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'test',
    icon: 'appstore',
    path: '/test',
    component: './test',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
