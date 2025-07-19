import axios from "axios";

const state = () => ({
        isError: false,
        isLoading: false,
        weather: {
            cityId: null,
            cityName: null,
            temp: null,
            feelsLike: null,
            status: null,
            statusIcon: null,
            fullData: null,
            dailyWeather: []
        },
        favorites: []
    });
const getters = {
        favorites: state => state.favorites,
        currentWeather: state => state.weather,
        currentDailyWeather: state => state.weather.dailyWeather,
        isLoading: state => state.isLoading,
        isError: state => state.isError,
        formatWindDirection: () => (deg) => {
            let windDescription = '';
            switch (true) {
                case (0 <= deg && deg <= 11.25):
                    windDescription = 'северный';
                    break;
                case (11.25 < deg && deg <= 33.75):
                    windDescription = 'северный, северо-восточный';
                    break;
                case (33.75 < deg && deg <= 56.25):
                    windDescription = 'северо-восточный';
                    break;
                case (56.25 < deg && deg <= 78.75):
                    windDescription = 'восточный, северо-восточный';
                    break;
                case (78.75 < deg && deg <= 101.25):
                    windDescription = 'восточный';
                    break;
                case (101.25 < deg && deg <= 123.75):
                    windDescription = 'восточный, юго-восточный';
                    break;
                case (123.75 < deg && deg <= 146.25):
                    windDescription = 'юго-восточный';
                    break;
                case (146.25 < deg && deg <= 168.75):
                    windDescription = 'южный, юго-восточный';
                    break;
                case (168.75 < deg && deg <= 191.25):
                    windDescription = 'южный';
                    break;
                case (191.25 < deg && deg <= 213.75):
                    windDescription = 'южный, юго-западный';
                    break;
                case (213.75 < deg && deg <= 236.25):
                    windDescription = 'юго-западный';
                    break;
                case (236.25 < deg && deg <= 258.75):
                    windDescription = 'западный, юго-западный';
                    break;
                case (258.75 < deg && deg <= 281.25):
                    windDescription = 'западный';
                    break;
                case (281.25 < deg && deg <= 303.75):
                    windDescription = 'западный, северо-западный';
                    break;
                case (303.75 < deg && deg <= 326.25):
                    windDescription = 'северо-западный';
                    break;
                case (326.25 < deg && deg <= 348.75):
                    windDescription = 'северный, северо-западный';
                    break;
                case (348.75 < deg && deg <= 360):
                    windDescription = 'северный';
                    break;
                default:
                    windDescription = 'Ошибка получения данных';
                    break;
            }
            return windDescription;
        },
        formatTimeType: () => (unixDate) => {
            const date = new Date(unixDate * 1000);

            let seconds = date.getUTCSeconds();
            let minutes = date.getUTCMinutes();
            let hours = date.getUTCHours();

            seconds < 10 ? seconds = '0' + seconds : seconds;
            minutes < 10 ? minutes = '0' + minutes : minutes;
            hours < 10 ? hours = '0' + hours : hours;

            return `${hours}:${minutes}:${seconds}`;
        },
        getWeekDayFromDate: () => (unixDate) => {
            const date = new Date(unixDate * 1000);

            let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

            return days[date.getUTCDay()];
        }
    };
const mutations = {
    setWeatherData(state, weatherData) {
        state.weather = weatherData;
    },
    setLoading(state, isLoading) {
        state.isLoading = isLoading;
    },
    setError(state, isError) {
        state.isError = isError;
    },
    resetWeather(state) {
        state.weather = {
            cityId: null,
            cityName: null,
            temp: null,
            feelsLike: null,
            status: null,
            statusIcon: null,
            fullData: null
        }
    },
    setDailyWeather(state, dailyWeatherData) {
        state.weather.dailyWeather = dailyWeatherData;
    },
    addFavorite(state, cityId) {
        const cityExist = state.favorites.some(city => city.cityId === cityId);
        if (!cityExist) {
            state.favorites.push({...state.weather});
        }
        console.log('add favorites:', state.favorites);
    },
    removeFavorite(state, cityId) {
        state.favorites = state.favorites.filter(city => city.cityId !== cityId);
        console.log('remove favorites:', state.favorites);
    },
    setWeatherDataFromFavorites(state, cityId) {
        const elem = state.favorites.filter(city => city.cityId === cityId);
        if (elem.length !== 0) {
            state.weather = elem[0];
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

            console.log('response:', response);
            const weatherData = {
                cityId: response.data.id,
                cityName: response.data.name,
                temp: Math.round(response.data.main.temp),
                feelsLike: Math.round(response.data.main.feels_like),
                status: response.data.weather[0].description,
                statusIcon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                fullData: response.data
            };

            commit('setWeatherData', weatherData);
            console.log('weatherData:', weatherData);
            return weatherData;
        } catch (error) {
            console.log('Ошибка при запросе погоды:', error);
            commit('setError', true);
        } finally {
            commit('setLoading', false);
        }
    },
    async fetchDailyWeatherData({ commit }, city) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
                params: {
                    q: city,
                    units: 'metric',
                    lang: 'ru',
                    appid: '85cc7fd172e4346ef38471324ffc447f'
                }
            });

            const dailyWeatherData = [];
            const processedDays = new Set();
            const timezoneOffset = response.data.city.timezone;

            response.data.list.forEach(item => {
                const localTime = new Date((item.dt + timezoneOffset) * 1000);
                const hours = localTime.getUTCHours();
                const dayKey = localTime.toISOString().split('T')[0];

                if (hours === 12 && !processedDays.has(dayKey)) {
                    processedDays.add(dayKey);

                    dailyWeatherData.push({
                        date: item.dt,
                        dateFormatted: localTime.toLocaleDateString('ru-RU'),
                        temp: Math.round(item.main.temp),
                        feelsLike: Math.round(item.main.feels_like),
                        status: item.weather[0].description,
                        statusIcon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                    });
                }
            });

            const fourDayForecast = dailyWeatherData.slice(0, 4);
            commit('setDailyWeather', fourDayForecast);
            console.log('dailyWeather:', fourDayForecast);
        } catch (error) {
            console.error("Ошибка при получении погоды:", error);
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