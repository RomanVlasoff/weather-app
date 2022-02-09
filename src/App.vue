<template>
  <v-app>
    <v-app-bar
        app
        absolute
        color="white"
        flat
    >
      <v-toolbar-title>{{ $t('appName') }}</v-toolbar-title>
      <v-spacer/>
      <SelectLanguage/>
    </v-app-bar>

    <v-main>
      <WeatherPage/>
    </v-main>

    <v-snackbar
        v-model="isFlashErrorShow"
        :timeout="2000"
        tile
        color="red accent-2"
    >
      {{ flashError ? $t(`errors.${flashError.errorKey}`) : '' }}
    </v-snackbar>
  </v-app>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import WeatherPage from './components/WeatherPage';
import SelectLanguage from './components/SelectLanguage';

export default {
  name: 'App',
  components: {
    WeatherPage,
    SelectLanguage
  },
  computed: {
    ...mapGetters({
      flashError: 'error'
    }),
    isFlashErrorShow: {
      get() {
        return this.flashError && this.flashError.isShow
      },
      set() {
        this.clearFlashError();
      }
    }
  },
  methods: {
    ...mapMutations({
      clearFlashError: 'CLEAR_ERROR'
    }),
  }
};
</script>
