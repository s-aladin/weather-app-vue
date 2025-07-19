import {createRouter, createWebHistory} from "vue-router";
import weatherForm from "@/Components/weatherForm.vue";
import mainPage from "@/Components/mainPage.vue";
import WeatherDetailsAndDaily from "@/Components/weatherDetailsAndDaily.vue";
import favorites from "@/Components/favorites.vue";

const routes =[
    {
        path: '/',
        component: mainPage
    },
    {
        path: '/form',
        component: weatherForm
    },
    {
        path: '/details',
        component: WeatherDetailsAndDaily
    },
    {
        path: '/favorites',
        component: favorites
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;