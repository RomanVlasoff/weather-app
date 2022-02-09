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
        :error-messages="isShowNoEnteredCityMessage ? [$t('errors.noCityWithEnteredName')] : []"
        @click:append-outer="onSearchSubmit"
        @keyup.enter="onSearchSubmit"
    />

    <SearchHistory class="mb-2"
                   @itemClick="onHistoryItemClick" />

    <v-slide-y-reverse-transition>
      <WeatherCard
          v-if="currentCity && currentWeather"
          :loading="isCityLoading || isWeatherLoading"
          :city-name="currentCityName"
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
    </v-slide-y-reverse-transition>

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
      isCityLoading: false,
      isWeatherLoading: false,
      searchText: '',
      currentCity: null,
      currentWeather: null,
      isShowNoEnteredCityMessage: false,
      searchFieldRules: [
        () => !!this.searchText && this.searchText.length > 0 || this.$t('errors.cityNameIsRequired'),
      ]
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
    currentCityName() {
      const names = this.currentCity?.local_names || [];
      return names[this.$i18n.locale] || names['en'] || Object.values(names)[0] || '';
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
      const { lon, lat } = this.currentCity;
      this.currentWeather = await getCurrentWeatherForLocation({ lon, lat }, this.$i18n.locale);
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
