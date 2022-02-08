<template>
  <v-select
      v-model="currentLanguage"
      :items="selectItems"
      menu-props="auto"
      :label="$t('i18n.selectLanguage')"
      hide-details
      prepend-icon="mdi-web"
      single-line
      outlined
  ></v-select>
</template>

<script>
import locales from '../locale/locales'

export default {
  name: "SelectLanguage",
  computed: {
    currentLanguage: {
      get() {
        // return this.$vuetify.lang.current;
        return this.$i18n.locale;
      },
      set(locale) {
        // this.$vuetify.lang.current = lang;
        this.$i18n.locale = locale;
      }
    },
    selectItems() {

      // $vuetify.lang.t('$vuetify.i18n.selectLanguage')

      // return Object.keys(this.$vuetify.lang.locales)

      // return Object.keys(this.$vuetify.lang.locales).map(locale => ({
      //   text: this.$vuetify.lang.t('$vuetify.i18n.selectLanguage', )
      // }));

      return locales.map(locale => ({
        // text: this.$vuetify.lang.locales[locale].i18n.languageName,
        text: this.$t('i18n.languageName', locale),
        // text: 'temp',
        value: locale
      }))
    },
    // temp() {
    //   return this.$vuetify.lang.locales
    // }
  }
}
</script>

<style scoped>

</style>
