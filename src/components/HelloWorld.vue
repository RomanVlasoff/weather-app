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
        :error-messages="isShowErrorMessage ? [$t('errors.noCityWithEnteredName')] : []"
        @click:append-outer="onSearchSubmit"
        @keyup.enter="onSearchSubmit"
    ></v-text-field>

    <v-card
        class="mx-auto"
        max-width="800"
    >
      <v-list-item two-line v-if="currentCity">
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            {{ currentCity.local_names[$i18n.locale] }}
          </v-list-item-title>
          <!--          <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>-->
        </v-list-item-content>
      </v-list-item>

      <v-card-text v-if="currentWeather">
        <v-row align="center">
          <v-col
              class="text-h2"
              cols="3"
          >
            {{ currentWeatherFormattedData.temp }}
          </v-col>
          <v-col cols="3">
            <v-img
                :src="currentWeatherFormattedData.imageUrl"
                :alt="currentWeatherFormattedData.state"
                width="92"
            />
          </v-col>
          <v-col cols="3">
            <v-row>
              <span>{{ currentWeatherFormattedData.state }}</span>
            </v-row>
            <v-row>
              <span>{{ $t('feelsLike', {temp: currentWeatherFormattedData.feelsLikeTemp}) }}</span>
            </v-row>
            <v-row>
              <span>{{ currentWeatherFormattedData.maxMinTemp }} </span>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-weather-windy</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{currentWeatherFormattedData.wind}}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-water-percent</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{currentWeatherFormattedData.humidity}}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-gauge</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{currentWeatherFormattedData.pressure}}</v-list-item-subtitle>
      </v-list-item>

      <!--      <v-slider-->
      <!--          v-model="time"-->
      <!--          :max="6"-->
      <!--          :tick-labels="labels"-->
      <!--          class="mx-4"-->
      <!--          ticks-->
      <!--      ></v-slider>-->

      <!--      <v-list class="transparent">-->
      <!--        <v-list-item-->
      <!--            v-for="item in forecast"-->
      <!--            :key="item.day"-->
      <!--        >-->
      <!--          <v-list-item-title>{{ item.day }}</v-list-item-title>-->

      <!--          <v-list-item-icon>-->
      <!--            <v-icon>{{ item.icon }}</v-icon>-->
      <!--          </v-list-item-icon>-->

      <!--          <v-list-item-subtitle class="text-right">-->
      <!--            {{ item.temp }}-->
      <!--          </v-list-item-subtitle>-->
      <!--        </v-list-item>-->
      <!--      </v-list>-->

      <!--      <v-divider></v-divider>-->

      <!--      <v-card-actions>-->
      <!--        <v-btn text>-->
      <!--          Full Report-->
      <!--        </v-btn>-->
      <!--      </v-card-actions>-->
    </v-card>

    <div>
      <v-chip
          v-for="city in searchHistory"
          :key="city[currentLocale]"
          @click="onHistoryItemClick(city)"
          class="ma-2"
      >
        {{city[currentLocale]}}
      </v-chip>
    </div>

  </v-container>
</template>

<script>
import {getCityByLocationName, getCurrentWeatherForLocation, getWeatherIconUrlByName} from "../services/api";
import {capitalizeFirstLetter, formatTemperature, getWindDirection} from "../utils/formatters"
import {getUrlSearchParams, setUrlSearchParam} from "../utils/url";
import {getUserCitySearchHistory, setUserSearchHistory, subscribeOnSearchHistoryChange} from "../services/userData";
import locales from '../locale/locales'
import {pick} from "lodash";

export default {
  name: 'HelloWorld',
  data() {
    return {
      searchText: '',
      currentCity: null,
      currentWeather: null,
      searchHistory: [],
      isShowErrorMessage: null,

      unsubscribeFromSearchHistoryChange: () => {},

      // labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
      // time: 0,
      // forecast: [
      //   { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
      //   { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
      //   { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
      // ],
    }
  },
  computed: {
    // currentWeatherImageUrl() {
    //   if (!this.currentWeather) return '';
    //
    //   return getWeatherIconUrlByName(this.currentWeather.weather[0].icon);
    // },
    // currentWeatherStateText() {
    //   if (!this.currentWeather) return '';
    //
    //   return capitalizeFirstLetter(this.currentWeather.weather[0].description);
    // },
    currentWeatherFormattedData() {
      if (!this.currentWeather) return {}

      // const t = this.$t.bind(this.$vuetify.lang);

      return {
        imageUrl: getWeatherIconUrlByName(this.currentWeather.weather[0].icon),
        state: capitalizeFirstLetter(this.currentWeather.weather[0].description),
        temp: formatTemperature(this.currentWeather.main.temp),
        feelsLikeTemp: formatTemperature(this.currentWeather.main.feels_like),
        maxMinTemp: this.$t('maxMinTemp', {
          max: formatTemperature(this.currentWeather.main.temp_max),
          min: formatTemperature(this.currentWeather.main.temp_min)
        }),
        pressure: this.$t('pressureValue', { value: this.currentWeather.main.pressure }),
        humidity: `${this.currentWeather.main.humidity}%`,
        wind: this.$t('wind.speedAndDirection', {
          speed: this.currentWeather.wind.speed,
          direction: this.$t(`wind.directions.${getWindDirection(this.currentWeather.wind.deg)}`)
        }),
      }
    },
    currentLocale() {
      return this.$i18n.locale;
    }
  },
  methods: {
    initData() {
      this.searchText = getUrlSearchParams().search;
      this.searchHistory = getUserCitySearchHistory();
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
      this.currentCity = await getCityByLocationName(this.searchText);
      this.isShowErrorMessage = !this.currentCity;
    },
    async fetchWeather() {
      this.currentWeather = await getCurrentWeatherForLocation({
        lon: this.currentCity.lon,
        lat: this.currentCity.lat
      }, this.$i18n.locale);
    },
    addCurrentCityToSearchHistory() {
      if (this.searchHistory.find(city => city['en'] === this.currentCity.local_names['en'])) {
        return;
      }

      this.searchHistory.push(pick(this.currentCity.local_names, locales));
      setUserSearchHistory(this.searchHistory);
    }
  },
  watch: {
    searchText() {
      this.isShowErrorMessage = false;
    },
    currentCity() {
      this.fetchWeather();
      this.addCurrentCityToSearchHistory();
    },
    currentLocale() {
      this.fetchWeather();
    }
  },
  created() {
    this.initData();

    window.addEventListener('popstate', this.initData);
    this.unsubscribeFromSearchHistoryChange = subscribeOnSearchHistoryChange((e) => {
      setUserSearchHistory(e);
      this.searchHistory = e;
    });


    // console.log(this.$vuetify.lang)
  },
  destroyed() {
    window.removeEventListener('popstate', this.initData);
    this.unsubscribeFromSearchHistoryChange();
  }
}
</script>
