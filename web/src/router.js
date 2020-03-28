import Router from 'vue-router';
import Main from './views/Main.vue';
import Home from './views/Home.vue';
import Article from './views/Article.vue';
import Hero from './views/Hero.vue';

const router = new Router({
    routes: [
        {
            path: '/',
            component: Main,
            children: [
                {
                    path: '/',
                    name:'home',
                    component: Home,
                },
                {
                    path: '/article/:id',
                    name:'article',
                    component: Article,
                    props:true,
                },
            ]
        },
        {
            path: '/hero/:id',
            name:'hero',
            component: Hero,
            props:true,
        },],
});

export default router;