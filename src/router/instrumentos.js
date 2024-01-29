import Crud from '../views/Instrumento/Crud'
import Entity from '../views/Instrumento/Add'

let routes = {
    path: '/instrumentos',
    component: resolve => require(['../layouts/full/LayoutFull'], resolve),
    children: [
        {
            path: '/instrumentos/add',
            name: 'NewInstrumento',
            component: Entity
        },
        {
            path: '/instrumentos/edit/:id?',
            name: 'EditInstrumento',
            component: Entity
        },
        {
            path: '/instrumentos',
            name: 'list-instrumentos',
            component: Crud,
            meta: {
                pageTitle: 'Lista de Instrumentos',
                breadcrumb: [
                    {
                        text: 'Instrumentos',
                        active: true,
                    },
                ],
            },
        },
    ]
};


export default routes
