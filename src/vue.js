// Import packages
import axios from 'axios';
import Vue from 'vue';
import VueRouter from 'vue-router';

// Import components for router
import Welcome from './components/welcome';
import NotFound from './components/notFound';

// Import App
import App from './app';

Vue.use(VueRouter);

window.axios = axios;

Vue.config.productionTip = false;

// // Configure Router
const router = new VueRouter({
    mode: 'history',

    routes: [
        {path: '/', component: Welcome, meta: {title: 'Welcome'}},
        {path: '*', component: NotFound, meta: {title: 'Not Found'}} // Render 404 page if url doesn't match other routes
    ]
});

// Update page title based on title tag of meta data
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Budget App';
    next();
});

// Render Vue

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');