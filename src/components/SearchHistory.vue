<template>
  <div>
    <v-chip
        v-for="city in searchHistory"
        :key="city[$i18n.locale]"
        @click="$emit('itemClick', city)"
        class="ma-0 mr-2 mb-2"
    >
      {{ city[$i18n.locale] }}
    </v-chip>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SearchHistory",
  computed: {
    ...mapGetters([
        'searchHistory'
    ]),
  },
  methods: {
    ...mapActions([
        'fetchHistory',
        'subscribeOnHistoryChange',
        'unsubscribeFromHistoryChange',
    ]),
  },
  created() {
    this.fetchHistory();
    this.subscribeOnHistoryChange();
  },
  destroyed() {
    this.unsubscribeFromHistoryChange();
  }
}
</script>
