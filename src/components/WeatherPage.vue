<template>
  <v-container>
    <v-text-field
        v-model="searchText"
        filled
        clearable
        :label="$t('city')"
        :placeholder="$t('exampleCity')"
        prepend-inner-icon="mdi-map-marker"
        append-outer-icon="mdi-magnify"
        :rules="searchFieldRules"
        :error-messages="isShowErrorMessage ? [$t('errors.noCityWithEnteredName')] : []"
        @click:append-outer="onSearchSubmit"
        @keyup.enter="onSearchSubmit"
    />

    <SearchHistory @itemClick="onHistoryItemClick" />

    <WeatherCard
        v-if="currentCity && currentWeather"
        :city-name="currentCity.local_names[$i18n.locale]"
        :image-url="getWeatherIconUrlByName(currentWeather.weather[0].icon)"
        :state="currentWeather.weather[0].description"
        :temp="currentWeather.main.temp"
        :feels-like-temp="currentWeather.main.feels_like"
        :max-temp="currentWeather.main.temp_max"
        :min-temp="currentWeather.main.temp_min"
        :pressure="currentWeather.main.pressure"
        :humidity="currentWeather.main.humidity"
        :wind-speed="currentWeather.wind.speed"
        :wind-deg="currentWeather.wind.deg"
        :time-stamp="currentWeather.dt"
        :time-zone="currentWeather.timezone"
    />

  </v-container>
</template>

<script>
import { getCurrentWeatherForLocation, getWeatherIconUrlByName } from "../services/api";
import {getUrlSearchParams, setUrlSearchParam} from "../utils/url";
import WeatherCard from "./WeatherCard";
import SearchHistory from "./SearchHistory";
import {mapActions} from "vuex";

export default {
  name: 'WeatherPage',
  components: {
    WeatherCard,
    SearchHistory,
  },
  data() {
    return {
      searchText: '',
      currentCity: null,
      currentWeather: null,
      isShowErrorMessage: null,
      searchFieldRules: [
        () => !!this.searchText && this.searchText.length > 0 || this.$t('errors.cityNameIsRequired'),
      ]
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    }
  },
  methods: {
    ...mapActions([
        'searchCityByLocationName',
    ]),
    initData() {
      this.searchText = getUrlSearchParams().search;
      this.fetchCity();
    },
    onSearchSubmit() {
      try {
        setUrlSearchParam('search', this.searchText)
        this.fetchCity();
      } catch (e) {
        console.log('error search city')
      }
    },
    onHistoryItemClick(city) {
      this.searchText = city[this.currentLocale];
      this.onSearchSubmit();
    },
    async fetchCity() {
      console.log('Fetch city')
      if (!this.searchText) {
        return;
      }

      this.currentCity = await this.searchCityByLocationName(this.searchText);
      this.isShowErrorMessage = !this.currentCity;
    },
    async fetchWeather() {
      this.currentWeather = await getCurrentWeatherForLocation({
        lon: this.currentCity.lon,
        lat: this.currentCity.lat
      }, this.$i18n.locale);
    },
    getWeatherIconUrlByName,
  },
  watch: {
    searchText() {
      this.isShowErrorMessage = false;
    },
    currentCity() {
      this.fetchWeather();
    },
    currentLocale() {
      this.fetchWeather();
    }
  },
  created() {
    this.initData();

    window.addEventListener('popstate', this.initData);
  },
  destroyed() {
    window.removeEventListener('popstate', this.initData);
  }
}
</script>

<style lang="scss" scoped>
.weather-card {
  background: linear-gradient(45deg, rgb(2, 136, 209), rgb(38, 198, 218));
}
</style>
