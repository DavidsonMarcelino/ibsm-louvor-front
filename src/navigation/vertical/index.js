export default [
  {
    title: 'Escala',
    route: 'home',
    icon: 'CalendarIcon',
  },
  {
    title: 'Cadastros',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Instrumentos',
        route: 'list-instrumentos',
      },
      {
        title: 'Usuários',
        route: 'list-users',
      },
    ],
  },
]
