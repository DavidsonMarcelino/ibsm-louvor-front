import Crud from '../views/Musica/Crud'
import Entity from '../views/Musica/Add'

let routes = {
    path: '/musicas',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/musicas/add',
            name: 'NewMusicas',
            component: Entity,
            meta: {
                pageTitle: 'Lista de Músicas',
                breadcrumb: [
                    {
                        text: 'Músicas',
                        active: false,
                        to: '/musicas'
                    },
                    {
                        text: "Criar",
                        active: true
                    },
                ],
            },
        },
        {
            path: '/musicas/edit/:id?',
            name: 'EditMusicas',
            component: Entity,
            meta: {
                pageTitle: 'Lista de Músicas',
                breadcrumb: [
                    {
                        text: 'Músicas',
                        active: false,
                        to: '/musicas'
                    },
                    {
                        text: "Editar",
                        active: true
                    },
                ],
            },
        },
        {
            path: '/musicas',
            name: 'list-musicas',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Músicas',
                breadcrumb: [
                    {
                        text: 'Músicas',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
