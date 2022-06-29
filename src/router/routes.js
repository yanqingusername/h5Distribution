import Login from '../pages/login/login.vue'
// import Home from '../pages/home/home.vue'
// import Index from '../pages/index/index.vue'
// import Scene from '../pages/scene/scene.vue'
// import Mine from '../pages/mine/mine.vue'
// import Task from '../pages/task/task.vue'
import Page404 from '../pages/page404/index.vue'
import instrumentList from '../pages/instrumentList.vue'
import instrumentPDF from '../pages/instrumentPDF.vue'
import waitDistribution from '../pages/waitDistribution.vue'
import tubeInfo from '../pages/tubeInfo.vue'
import lisInfoCustom from '../pages/lisInfoCustom.vue'



const routes = [{
        path: '/login',
        component: Login
    },
    // {
    //     name: 'home',
    //     path: '/home',
    //     component: Home,
    //     children: [{
    //         name: 'index',
    //         path: 'index',
    //         component: Index
    //     }, {
    //         name: 'task',
    //         path: 'task',
    //         component: Task
    //     }, {
    //         name: 'scene',
    //         path: 'scene',
    //         component: Scene
    //     }, {
    //         name: 'mine',
    //         path: 'mine',
    //         component: Mine
    //     }, {
    //         path: '/',
    //         redirect: 'index'
    //     }]
    // },
    {
        path:"/instrumentList",
        component: instrumentList
    },
    {
        path:"/instrumentPDF",
        component: instrumentPDF
    },
    {
        path:"/waitDistribution",
        component: waitDistribution
    },
    {
        path:"/tubeInfo",
        component: tubeInfo
    },
    {
        path:"/lisInfoCustom",
        component: lisInfoCustom
    },
    {
        path: '/',
        component: Login
    },
    {
        path: '*',
        component: Page404 //404页面
    }
]

export default routes