import Crud from '../views/Banda/Crud'
import Entity from '../views/Banda/Add'

let routes = {
    path: '/bandas',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/bandas/add',
            name: 'NewBanda',
            component: Entity
        },
        {
            path: '/bandas/edit/:id?',
            name: 'EditBanda',
            component: Entity
        },
        {
            path: '/bandas',
            name: 'list-bandas',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Bandas',
                breadcrumb: [
                    {
                        text: 'Bandas',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
