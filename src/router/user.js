import Crud from '../views/User/Crud'
import Entity from '../views/User/Add'

let routes = {
    path: '/users',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/users/add',
            name: 'NewUser',
            component: Entity
        },
        {
            path: '/users/edit/:id?',
            name: 'EditUser',
            component: Entity
        },
        {
            path: '/users',
            name: 'list-users',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Usuários',
                breadcrumb: [
                    {
                        text: 'Usuários',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
