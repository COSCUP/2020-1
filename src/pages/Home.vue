<template>
  <div id="home" class="main-container">
    <div class="banner-container">
      <div class="logo-wrapper">
        <div class="logo-container">
          <h2>COSCUP 2020</h2>
          <div class="logo-content">
            <img src="/2020/img/banner-logo.svg" alt="COSCUP" />
            <div>
              <p>Conference for Open Source Coders, Users & Promoters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-container">
      <div class="info">
        <span>8 / 1 ~ 8 / 2</span>
        <span>{{ languagePack.home.info.venue }}</span>
      </div>
      <div class="tabs-wrapper">
        <div class="tabs-container">
          <a
            class="tab"
            @click="
              $router.push({ name: 'Home', query: { popUp: 'announcement' } })
            "
          >
            <span>{{ languagePack.home.info.tabs.announcement }}</span>
          </a>
          <a
            class="tab"
            href="https://sitcon.kktix.cc/events/sitcon2020"
            target="_blank"
            rel="noopener"
          >
            <span>{{ languagePack.home.info.tabs.registration }}</span>
          </a>
          <a
            class="tab"
            href="https://bit.ly/donatesitcon2020"
            target="_blank"
            rel="noopener"
          >
            <span>{{ languagePack.home.info.tabs.donate }}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="spotlight-container">
      <div class="spotlight sharp-back-taton">
        <h1 class="title has-prefix-icon">
          <img class="prefix-icon" src="/2020/img/logo.svg" />
          <span class="inner font-black">{{
            languagePack.home.about.title
          }}</span>
        </h1>
        <div v-html="markdownParser(languagePack.home.about.content)"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { markdown } from 'markdown'
import { Getter } from 'vuex-class'
import { Language } from '../../languages'

import head from '@/util/head'

@Component
export default class Home extends Vue {
  @Getter('languagePack', { namespace: 'app' }) private languagePack!: Language;

  public mounted () {
    head.reset()
  }

  private markdownParser (rawContent: string): string {
    return markdown.toHTML(rawContent)
  }
}
</script>
