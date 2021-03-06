<template>
  <v-card
      class="mx-auto weather-card"
      dark
      flat
      rounded="xl"
      min-height="310"
  >
    <v-fade-transition group>
      <div v-if="loading"
           class="progress-wrapper"
           key="progress"
      >
        <v-progress-circular indeterminate color="white"/>
      </div>
      <div v-else key="weather-card-content">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5">
              {{ cityName }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ formattedData.time }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <div class="d-flex flex-row align-center flex-wrap">
            <div class="text-h2">
              {{ formattedData.temp }}
            </div>
            <div>
              <v-img
                  :src="imageUrl"
                  :alt="formattedData.state"
                  width="160"
                  height="120"
              >
                <template v-slot:placeholder>
                  <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                  >
                    <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                    />
                  </v-row>
                </template>
              </v-img>
            </div>
            <div class="d-flex flex-column">
              <span>{{ formattedData.state }}</span>
              <span>{{ formattedData.feelsLikeTemp }}</span>
              <span>{{ formattedData.maxMinTemp }} </span>
            </div>
          </div>
        </v-card-text>

        <div>
          <v-chip v-for="property in mainProperties"
                  :key="property.value"
                  class="ma-2"
                  color="grey lighten-5"
                  outlined
                  :title="property.title"
          >
            <v-icon left>
              {{ property.icon }}
            </v-icon>
            {{ property.value }}
          </v-chip>
        </div>
      </div>
    </v-fade-transition>
  </v-card>
</template>

<script>
import {capitalizeFirstLetter, formatTemperature, getWindDirection} from "../utils/formatters";

export default {
  name: "WeatherCard",
  props: {
    loading: Boolean,
    cityName: {
      type: String,
      required: true,
    },
    imageUrl: String,
    state: {
      type: String,
      default: ''
    },
    temp: {
      type: [String, Number],
      required: true
    },
    feelsLikeTemp: [String, Number],
    maxTemp: [String, Number],
    minTemp: [String, Number],
    pressure: [String, Number],
    humidity: [String, Number],
    windSpeed: [String, Number],
    windDeg: [String, Number],
    timeStamp: [String, Number],
    timeZone: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    formattedData() {
      let date, time;
      if (this.timeStamp) {
        date = new Date(this.timeStamp * 1000);
        time = date.toLocaleTimeString('ru', { timeZone: this.timeZone, hour: '2-digit', minute: '2-digit' });
      }

      const safeFormat = (value, formatter, defaultValue = '') => {
        return value == null ? defaultValue : formatter();
      }

      return {
        state: capitalizeFirstLetter(this.state),
        temp: safeFormat(this.temp, () => formatTemperature(this.temp)),
        feelsLikeTemp: safeFormat(this.feelsLikeTemp, () => this.$t('feelsLike', {temp: formatTemperature(this.feelsLikeTemp)})),
        maxMinTemp: this.maxTemp != null && this.minTemp != null
            ? this.$t('maxMinTemp', {
              max: formatTemperature(this.maxTemp),
              min: formatTemperature(this.minTemp)
            })
            : null,
        pressure: safeFormat(this.pressure, () => this.$t('pressureValue', {value: this.pressure})),
        humidity: safeFormat(this.humidity, () => `${this.humidity}%`),
        wind: this.windSpeed != null && this.windDeg != null
            ? this.$t('wind.speedAndDirection', {
              speed: this.windSpeed,
              direction: this.$t(`wind.directions.${getWindDirection(this.windDeg)}`)
            })
            : null,
        time: safeFormat(date, () => this.$t('timeNow', { time })),
      }
    },
    mainProperties() {
      return [
        {icon: 'mdi-weather-windy', value: this.formattedData.wind, title: this.$t('wind.wind')},
        {icon: 'mdi-water-percent', value: this.formattedData.humidity, title: this.$t('humidity')},
        {icon: 'mdi-gauge', value: this.formattedData.pressure, title: this.$t('pressure')},
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.weather-card {
  background: #2f80ed;
  background: -webkit-linear-gradient(to right, #2f80ed, #56ccf2);
  background: linear-gradient(to right, #2f80ed, #56ccf2);
  padding: 16px;

  .progress-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
