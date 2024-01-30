import Crud from '../views/Partitura/Crud'
import Entity from '../views/Partitura/Add'

let routes = {
    path: '/partituras',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/partituras/add',
            name: 'NewPartituras',
            component: Entity
        },
        {
            path: '/partituras/edit/:id?',
            name: 'EditPartituras',
            component: Entity
        },
        {
            path: '/partituras',
            name: 'list-partituras',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Partituras',
                breadcrumb: [
                    {
                        text: 'Partituras',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
