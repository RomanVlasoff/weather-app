<template>
  <v-container class="pt-4 pt-md-10">
    <v-text-field
        v-model="searchText"
        filled
        clearable
        rounded
        :label="$t('city')"
        :placeholder="$t('exampleCity')"
        prepend-inner-icon="mdi-map-marker"
        append-outer-icon="mdi-magnify"
        :rules="searchFieldRules"
        :error-messages="inputErrorMessages"
        @click:append-outer="onSearchSubmit"
        @keyup.enter="onSearchSubmit"
    />

    <SearchHistory class="mb-2"
                   @itemClick="onHistoryItemClick"/>

    <v-slide-y-reverse-transition>
      <WeatherCard
          v-if="currentCity && currentWeather"
          :loading="isCityLoading || isWeatherLoading"
          :city-name="currentCityName"
          :image-url="getWeatherIconUrlByName(currentWeather.weather[0].icon)"
          :state="currentWeather.weather[0].description"
          :temp="currentWeather.temp"
          :feels-like-temp="currentWeather.feels_like"
          :max-temp="currentWeather.temp_max"
          :min-temp="currentWeather.temp_min"
          :pressure="currentWeather.pressure"
          :humidity="currentWeather.humidity"
          :wind-speed="currentWeather.wind_speed"
          :wind-deg="currentWeather.wind_deg"
          :time-stamp="currentWeather.dt"
          :time-zone="weather.timezone"
      />
    </v-slide-y-reverse-transition>

    <v-fade-transition>
      <v-slide-group v-if="weather"
                     v-show="!isWeatherLoading"
                     multiple
                     show-arrows
                     class="mt-2"
      >
        <v-slide-item
            v-for="day in weather.daily"
            :key="day.dt"
        >
          <WeatherMiniCard :time-stamp="day.dt"
                           :time-zone="weather.timezone"
                           :image-url="getWeatherIconUrlByName(day.weather[0].icon)"
                           :day-temp="day.temp.day"
                           :night-temp="day.temp.night"
                           :state="day.weather[0].description"
                           class="mr-2 my-1"
          />
        </v-slide-item>
      </v-slide-group>
    </v-fade-transition>
  </v-container>
</template>

<script>
import {getWeatherIconUrlByName, getWeatherForLocation} from "../services/api";
import {getUrlSearchParams, setUrlSearchParam} from "../utils/url";
import WeatherCard from "./WeatherCard";
import WeatherMiniCard from "./WeatherMiniCard";
import SearchHistory from "./SearchHistory";
import {mapActions} from "vuex";

export default {
  name: 'WeatherPage',
  components: {
    WeatherCard,
    WeatherMiniCard,
    SearchHistory,
  },
  data() {
    return {
      isCityLoading: false,
      isWeatherLoading: false,
      searchText: '',
      currentCity: null,
      weather: null,
      isShowNoEnteredCityMessage: false,
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
    currentCityName() {
      const names = this.currentCity?.local_names || [];
      return names[this.$i18n.locale] || names['en'] || Object.values(names)[0] || '';
    },
    currentWeather() {
      if (!this.weather) {
        return null;
      }

      return {
        ...this.weather.current,
        temp_max: this.weather.daily[0].temp.max,
        temp_min: this.weather.daily[0].temp.min
      };
    },
    inputErrorMessages() {
      return this.isShowNoEnteredCityMessage ? [this.$t('errors.noCityWithEnteredName')] : [];
    },
    searchFieldRules() {
      return [ !!this.searchText && this.searchText.length > 0 || this.$t('errors.cityNameIsRequired', this.currentLocale) ];
    }
  },
  methods: {
    ...mapActions([
      'searchCityByLocationName',
    ]),
    initData() {
      this.searchText = getUrlSearchParams().search || '';
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
      if (!this.searchText) {
        return;
      }

      this.isCityLoading = true;
      this.currentCity = await this.searchCityByLocationName(this.searchText);
      this.isCityLoading = false;
      this.isShowNoEnteredCityMessage = !this.currentCity;
    },
    async fetchWeather() {
      if (!this.currentCity) {
        return;
      }

      this.isWeatherLoading = true;
      const {lon, lat} = this.currentCity;
      this.weather = await getWeatherForLocation({lon, lat}, this.$i18n.locale);
      this.isWeatherLoading = false;
    },
    getWeatherIconUrlByName,
  },
  watch: {
    searchText() {
      this.isShowNoEnteredCityMessage = false;
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
</style>
