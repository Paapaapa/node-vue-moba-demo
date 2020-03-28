import Router from 'vue-router';
import Main from './views/Main.vue';
import CategoryEdit from './views/category/CategoryEdit.vue';
import CategoryList from './views/category/CategoryList.vue';
import ItemEdit from './views/item/ItemEdit.vue';
import ItemList from './views/item/ItemList.vue';
import HeroEdit from './views/hero/HeroEdit.vue';
import HeroList from './views/hero/HeroList.vue';
import ArticleEdit from './views/article/ArticleEdit.vue';
import ArticleList from './views/article/ArticleList.vue';
import AdEdit from './views/ad/AdEdit.vue';
import AdList from './views/ad/AdList.vue';
import AdminUserEdit from './views/adminUser/AdminUserEdit.vue';
import AdminUserList from './views/adminUser/AdminUserList.vue';
import Login from './views/Login.vue';

const router = new Router({
    routes: [{
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            isPublic: true,
        },
    },
    {
        path: '/',
        name: 'main',
        component: Main,
        children: [
            {
                path: '/category/create',
                component: CategoryEdit,
            },
            {
                path: '/category/list',
                component: CategoryList,
            },
            {
                path: '/category/edit/:id',
                component: CategoryEdit,
                props: true,
            },
            {
                path: '/item/create',
                component: ItemEdit,
            },
            {
                path: '/item/list',
                component: ItemList,
            },
            {
                path: '/item/edit/:id',
                component: ItemEdit,
                props: true,
            },
            {
                path: '/hero/create',
                component: HeroEdit,
            },
            {
                path: '/hero/list',
                component: HeroList,
            },
            {
                path: '/hero/edit/:id',
                component: HeroEdit,
                props: true,
            },
            {
                path: '/article/create',
                component: ArticleEdit,
            },
            {
                path: '/article/list',
                component: ArticleList,
            },
            {
                path: '/article/edit/:id',
                component: ArticleEdit,
                props: true,
            },
            {
                path: '/ad/create',
                component: AdEdit,
            },
            {
                path: '/ad/list',
                component: AdList,
            },
            {
                path: '/ad/edit/:id',
                component: AdEdit,
                props: true,
            },
            {
                path: '/admin_user/create',
                component: AdminUserEdit,
            },
            {
                path: '/admin_user/list',
                component: AdminUserList,
            },
            {
                path: '/admin_user/edit/:id',
                component: AdminUserEdit,
                props: true,
            },
        ]
    }],
});

// 导航守卫
router.beforeEach((to, from, next) => {
    // 若非进入登录页且没有token，进入login页
    if (!to.meta.isPublic && !localStorage.getItem('token')) {
        next("/login");
    }
    next();
});

export default router;