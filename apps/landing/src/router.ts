import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import ComponentPage from './pages/ComponentPage.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/components/:id', component: ComponentPage, props: true }
    ]
})
