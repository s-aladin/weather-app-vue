import {createRouter, createWebHistory} from "vue-router";
import weatherForm from "@/Components/weatherForm.vue";
import mainPage from "@/Components/mainPage.vue";
import WeatherDetailsAndDaily from "@/Components/weatherDetailsAndDaily.vue";

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
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;