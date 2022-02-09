<template>
  <v-menu offset-y open-on-hover>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          text
          v-bind="attrs"
          v-on="on"
      >
        <v-icon>mdi-translate</v-icon>
        <v-icon x-small light>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item-group
          color="primary"
          v-model="$i18n.locale"
      >
        <v-list-item
            v-for="item in items"
            :key="item.value"
            :value="item.value"
            selectable
        >
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import locales from '../locale/locales'

export default {
  name: "SelectLanguage",
  computed: {
    items() {
      return locales.map(locale => ({
        text: this.$t('i18n.languageName', locale),
        value: locale
      }))
    },
  }
}
</script>
