<template>
  <footer class="footer-container">
    <div id="brand" class="footer">
      <p>
        <span class="font-bold">COSCUP</span>
        <span class="font-bold">Conference for Open Source Coders, Users, and Promoters</span>
      </p>
    </div>
    <div id="past" class="footer">
      <p>
        <span class="font-bold">歷年網站</span>
        <span class="font-bold">
          <a
            v-for="i in numOfPast"
            :key="`website-${2006 + i}`"
            :href="`https://coscup.org/${ 2006 + i }/`"
            target="_blank"
            rel="noopener"
            class="font-bold"
          >{{ 2006 + i }}</a>
        </span>
      </p>
    </div>
    <div id="media" class="footer">
      <p>
        <span class="font-bold">社群媒體</span>
        <span class="font-bold">
          <a
            v-for="media in communityMedia"
            :key="`media-${ media.icon[1] }`"
            :href="media.link"
            target="_blank"
            rel="noopener"
          >
            <font-awesome-icon :icon="media.icon"/>
          </a>
        </span>
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {
  private get numOfPast () {
    return new Date().getFullYear() - 2006
  }

  private communityMedia = [
    {
      icon: ['fab', 'blogger'],
      link: 'http://blog.coscup.org/'
    },
    {
      icon: ['fab', 'facebook'],
      link: 'https://www.facebook.com/coscup/'
    },
    {
      icon: ['fab', 'flickr'],
      link: 'https://www.flickr.com/photos/coscup/'
    },
    {
      icon: ['ext', 'plurk'],
      link: 'https://www.plurk.com/coscup'
    },
    {
      icon: ['fab', 'twitter'],
      link: 'https://twitter.com/coscup'
    },
    {
      icon: ['fab', 'youtube'],
      link: 'https://www.youtube.com/user/thecoscup'
    },
    {
      icon: ['fab', 'telegram'],
      link: 'https://t.me/coscupchat'
    },
    {
      icon: 'bullhorn',
      link: 'https://t.me/coscup'
    }
  ];
}
</script>
