<template>
  <div id="sponsor" class="main-container">
    <div class="card outer-container">
      <h2 class="font-black subtitle" style="text-align: start;">
        {{ languagePack.sponsor.callForSponsorship.title }}
      </h2>
      <p class="paragraph">
        {{ languagePack.sponsor.callForSponsorship.content }}
        <a class="font-bold" href="mailto:sponsorship@coscup.org"
          >sponsorship@coscup.org</a
        >
      </p>
    </div>
    <div
      v-for="level in Object.keys(sponsorList)"
      :key="`sponsor-level-${level}`"
      class="card outer-container"
    >
      <h2 class="level font-bold">{{ languagePack.sponsor.level[level] }}</h2>
      <div
        v-for="sponsor in sponsorList[level]"
        :key="sponsor.id"
        class="card sponsor-container"
      >
        <div class="img-container">
          <a :href="`${sponsor.link}`" target="_blank" rel="noopener">
            <img
              :src="`/2020/img/sponsors/${sponsor.image}`"
              :alt="sponsor.name[language]"
            />
          </a>
        </div>
        <div class="content-container">
          <a :href="`${sponsor.link}`" target="_blank" rel="noopener">
            <h2 class="font-bold">{{ sponsor.name[language] }}</h2>
          </a>
          <div
            v-for="(partial, index) in sponsor.intro[language].split('\\n')"
            :key="`${sponsor.id}-intro-partial-${index}`"
            v-html="markdownParser(partial)"
            class="intro-partial"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import { markdown } from 'markdown'
import { Getter } from 'vuex-class'
import { Language } from '../../languages'

import sponsorData from '@/../public/json/sponsor.json'

interface SponsorData {
  id: string;
  level: 'titanium' | 'diamond' | 'gold' | 'silver' | 'bronze' | 'co-organizer' | 'special-thanks';
  name: {
    en: string;
    'zh-TW': string;
  };
  intro: {
    en: string;
    'zh-TW': string;
  };
  image: string | null;
  link: string | null;
}

@Component
export default class Sponsor extends Vue {
  @Getter('language', { namespace: 'app' }) private language!: string;
  @Getter('languagePack', { namespace: 'app' }) private languagePack!: Language;

  private sponsorList: object = {};

  public mounted () {
    this.processSponsor()
  }

  private processSponsor (): void {
    this.sponsorList = _.groupBy(sponsorData, 'level')
  }

  private markdownParser (rawContent: string): string {
    return markdown.toHTML(rawContent)
  }
}
</script>
