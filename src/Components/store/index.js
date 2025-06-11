import {createStore} from "vuex";
import weatherModule from "@/Components/store/weatherModule";
export default createStore({
    modules: {
        weatherModule
    }
})