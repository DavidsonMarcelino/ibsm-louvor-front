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
        title: 'Bandas',
        route: 'list-bandas',
      },
      {
        title: 'Instrumentos',
        route: 'list-instrumentos',
      },
      {
        title: 'Músicas',
        route: 'list-musicas',
      },
      {
        title: 'Partituras',
        route: 'list-partituras',
      },
      {
        title: 'Usuários',
        route: 'list-users',
      },
    ],
  },
]
