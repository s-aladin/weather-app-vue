import axios from "axios";

const state = () => ({
        isError: false,
        isLoading: false,
        weather: {
            cityName: null,
            temp: null,
            feelsLike: null,
            status: null,
            statusIcon: null,
            fullData: null
        }
    });
const getters = {
        currentWeather: state => state.weather,
        isLoading: state => state.isLoading,
        isError: state => state.isError
    };
const mutations = {
        setWeatherData(state, weatherData) {
            state.weather = weatherData
        },
        setLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
        setError(state, isError) {
            state.isError = isError;
        },
        resetWeather(state) {
            state.weather = {
                cityName: null,
                temp: null,
                feelsLike: null,
                status: null,
                statusIcon: null,
                fullData: null
            }
        }
    };
const actions = {
    async fetchWeatherData({ commit }, city) {
        if (!city.trim()) return;

        commit('setLoading', true);
        commit('setError', false);
        commit('resetWeather');

        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: city,
                    units: 'metric',
                    lang: 'ru',
                    appid: '85cc7fd172e4346ef38471324ffc447f'
                }
            });

            const weatherData = {
                cityName: response.data.name,
                temp: Math.round(response.data.main.temp),
                feelsLike: Math.round(response.data.main.feels_like),
                status: response.data.weather[0].description,
                statusIcon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                fullData: response.data
            };

            commit('setWeatherData', weatherData);
            console.log(weatherData);
            return weatherData;
        } catch (error) {
            console.log('Ошибка при запросе погоды:', error);
            commit('setError', true);
        } finally {
            commit('setLoading', false);
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}