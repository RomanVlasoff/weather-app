<template>
  <v-card outlined
          rounded="lg"
          width="136"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          {{ formattedData.weekDay }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ formattedData.date }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
        :src="imageUrl"
        :alt="formattedData.state"
        width="60"
        height="30"
    >
      <template v-slot:placeholder>
        <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
        >
          <v-progress-circular
              indeterminate
              color="primary"
              :size="16"
              :width="2"
          />
        </v-row>
      </template>
    </v-img>

    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title>{{ formattedData.dayTemp }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ formattedData.nightTemp }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          {{ formattedData.state }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

  </v-card>
</template>

<script>
import {capitalizeFirstLetter, formatTemperature} from "../utils/formatters";

export default {
  name: "WeatherMiniCard",
  props: {
    timeStamp: {
      type: [Number, String],
      required: true,
    },
    timeZone: {
      type: [Number, String],
      required: true,
    },
    imageUrl: String,
    dayTemp: [Number, String],
    nightTemp: [Number, String],
    state: {
      type: String,
      default: ''
    }
  },
  computed: {
    formattedData() {
      const date = new Date(this.timeStamp * 1000);
      const today = new Date();
      const weekDay = date.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)
          ? this.$t('today')
          : date.toLocaleDateString(this.$i18n.locale, {weekday: 'short', timeZone: this.timeZone});
      const dateStr = date.toLocaleDateString(this.$i18n.locale, {
        day: 'numeric',
        month: 'short',
        timeZone: this.timeZone
      })

      return {
        weekDay: capitalizeFirstLetter(weekDay),
        date: dateStr,
        state: capitalizeFirstLetter(this.state),
        dayTemp: this.dayTemp != null ? formatTemperature(this.dayTemp) : '',
        nightTemp: this.nightTemp != null ? formatTemperature(this.nightTemp) : '',
      }
    }
  }
}
</script>

<style scoped>

</style>
