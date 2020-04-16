<template>
  <div id="venue" class="venue main-container">
    <h1 class="title">地點</h1>
    <p class="content">
      中央研究院人文社會科學館<br/>
      台北市南港區研究院路二段 128 號
    </p>
    <sitcon-map width="100%" height="650px" />
    <div class="venue-flow">
      <img src="@/assets/images/venue-flow.svg" alt="">
    </div>
    <div class="hint">
      <p>
        <font-awesome-icon :icon="['fas', 'angle-left']" />
        <span>左右滑動路線圖以檢視更多</span>
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import SitconMap from '@/components/SitconMap.vue'

@Component({
  components: {
    SitconMap
  }
})
export default class Venue extends Vue {
}
</script>
