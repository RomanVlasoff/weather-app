<template>
  <v-app>
    <v-main>
      <HelloWorld/>
    </v-main>

    <SelectLanguage />

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
import { mapGetters, mapMutations } from 'vuex';
import HelloWorld from './components/HelloWorld';
import SelectLanguage from './components/SelectLanguage';

export default {
  name: 'App',

  components: {
    HelloWorld,
    SelectLanguage
  },

  data: () => ({
    //
  }),
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
