<template>
  <v-card
      class="mx-auto weather-card"
      max-width="800"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          {{cityName}}
        </v-list-item-title>
        <v-list-item-subtitle>{{formattedData.time}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col
            class="text-h2"
            cols="3"
        >
          {{ formattedData.temp }}
        </v-col>
        <v-col cols="3">
          <v-img
              :src="imageUrl"
              :alt="formattedData.state"
              width="92"
          />
        </v-col>
        <v-col cols="3">
          <v-row>
            <span>{{ formattedData.state }}</span>
          </v-row>
          <v-row>
            <span>{{formattedData.feelsLikeTemp}}</span>
          </v-row>
          <v-row>
            <span>{{ formattedData.maxMinTemp }} </span>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>

    <v-row>
      <v-col cols="3">
        <v-list-item dense>
          <v-list-item-icon>
            <v-icon>mdi-weather-windy</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ formattedData.wind }}</v-list-item-subtitle>
        </v-list-item>
      </v-col>
      <v-col cols="3">
        <v-list-item dense>
          <v-list-item-icon>
            <v-icon>mdi-water-percent</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ formattedData.humidity }}</v-list-item-subtitle>
        </v-list-item>
      </v-col>
      <v-col cols="3">
        <v-list-item dense>
          <v-list-item-icon>
            <v-icon>mdi-gauge</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ formattedData.pressure }}</v-list-item-subtitle>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {capitalizeFirstLetter, formatTemperature, getWindDirection} from "../utils/formatters";

export default {
  name: "WeatherCard",
  props: {
    cityName: {
      type: String,
      required: true,
    },
    imageUrl: String,
    state: String,
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
    timeZone: [String, Number],
  },
  computed: {
    formattedData() {
      const date = new Date((this.timeStamp + (this.timeZone)) * 1000);

      return {
        state: capitalizeFirstLetter(this.state),
        temp: formatTemperature(this.temp),
        feelsLikeTemp: this.$t('feelsLike', { temp: formatTemperature(this.feelsLikeTemp) }),
        maxMinTemp: this.$t('maxMinTemp', {
          max: formatTemperature(this.maxTemp),
          min: formatTemperature(this.minTemp)
        }),
        pressure: this.$t('pressureValue', {value: this.pressure}),
        humidity: `${this.humidity}%`,
        wind: this.$t('wind.speedAndDirection', {
          speed: this.windSpeed,
          direction: this.$t(`wind.directions.${getWindDirection(this.windDeg)}`)
        }),
        time: this.$t('timeNow', { time: `${date.getUTCHours()}:${date.getUTCMinutes()}` })
      }
    }
  }
}
</script>

<style scoped>

</style>
