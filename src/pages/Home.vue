<template>
  <div id="home" class="main-container">
    <div class="info">
      <div class="logo-container">
        <img src="/2020/img/logo.png" />
      </div>
      <div class="tabs-container">
        <a
          class="tab"
          @click="
            $router.push({ name: 'Home', query: { popUp: 'announcement' } })
          "
        >
          <span>大會公告</span>
        </a>
        <a
          class="tab"
          href="https://sitcon.kktix.cc/events/sitcon2020"
          target="_blank"
          rel="noopener"
        >
          <span>免費報名</span>
        </a>
        <a
          class="tab"
          href="https://bit.ly/donatesitcon2020"
          target="_blank"
          rel="noopener"
        >
          <span>贊助取票</span>
        </a>
      </div>
    </div>
    <div class="spotlight-container">
      <div class="spotlight sharp-back-taton">
        <h1 class="title has-prefix-icon">
          <img class="prefix-icon" src="/2020/img/logo-200.png" />
          <span class="inner font-black">{{languagePack.about.title}}</span>
        </h1>
        <div v-html="markdownParser(languagePack.about.content)"></div>
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
