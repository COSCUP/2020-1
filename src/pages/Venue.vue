<template>
  <div id="venue" class="venue main-container">
    <VenueMap width="100%" height="650px" />
    <div class="plan-container">
      <div v-for="entry in Object.entries(languagePack.venue.plans)" :key="entry[0]" class="plan">
        <h3 class="font-black">{{entry[0]}}</h3>
        <section v-html="markdownParser(entry[1])"></section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Language } from '../../languages'
import { markdown } from 'markdown'

import VenueMap from '@/components/VenueMap.vue'

@Component({
  components: {
    VenueMap
  }
})
export default class Venue extends Vue {
  @Getter('languagePack', { namespace: 'app' }) private languagePack!: Language;

  private markdownParser (rawContent: string) {
    return markdown.toHTML(rawContent)
  }
}
</script>
