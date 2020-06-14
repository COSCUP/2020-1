<template>
  <div
    id="app"
    :class="[
      `theme-${ theme.toLowerCase() }`,
      'main',
      isInApp() ? 'in-app' : '',
      isPopup ? 'popuped' : ''
    ]"
  >
    <Navbar v-if="!isInApp()" />
    <Popup :isOpen="isPopup" :content="popupContent" />
    <transition :name="transitionDirect.toLowerCase()">
      <keep-alive>
        <router-view class="transition-group" />
      </keep-alive>
    </transition>
    <SponsorFooter v-show="!['Agenda', 'AgendaView'].includes($route.name)" />
    <Footer v-show="!['Agenda', 'AgendaView'].includes($route.name)" />
  </div>
</template>

<script lang="ts">
import { Route } from 'vue-router'

import { Component, Watch, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import Navbar from '@/components/Navbar.vue'
import Popup from '@/components/Popup.vue'
import Footer from '@/components/Footer.vue'
import SponsorFooter from '@/components/SponsorFooter.vue'

import { DeviceType, AppMode, ThemeType } from '@/store/types/app'

import head from '@/util/head'
import { languages, LanguageType } from '../languages'

enum TransitionDirect {
  SLIDE_LEFT = 'slide-left',
  SLIDE_RIGHT = 'slide-right'
}

@Component({
  components: {
    Navbar,
    Popup,
    Footer,
    SponsorFooter
  }
})
export default class App extends Vue {
  @Action('toggleTheme', { namespace: 'app' }) private toggleTheme!: (
    theme: ThemeType
  ) => void;

  @Action('toggleMode', { namespace: 'app' }) private toggleMode!: (
    mode: AppMode
  ) => void;

  @Action('toggleDevice', { namespace: 'app' }) private toggleDevice!: (
    device: DeviceType
  ) => void;

  @Action('togglePopup', { namespace: 'app' }) private togglePopup!: (
    status: boolean
  ) => void;

  @Action('togglePopupContent', { namespace: 'app' })
  private togglePopupContent!: (content: string) => void;

  @Action('setLanguage', { namespace: 'app' })
  private setLanguage!: (language: string) => void;

  @Action('getSunRiseSunSetData', { namespace: 'sunRiseSunSet' })
  private getSunRiseSunSetData!: () => Promise<void>;

  @Getter('device', { namespace: 'app' }) private device!: DeviceType;
  @Getter('mode', { namespace: 'app' }) private mode!: AppMode;
  @Getter('theme', { namespace: 'app' }) private theme!: ThemeType;
  @Getter('language', { namespace: 'app' }) private language!: string;
  @Getter('isPopup', { namespace: 'app' }) private isPopup!: boolean;
  @Getter('popupContent', { namespace: 'app' }) private popupContent!: string;
  @Getter('sunrise', { namespace: 'sunRiseSunSet' }) private sunrise!: Date;
  @Getter('sunset', { namespace: 'sunRiseSunSet' }) private sunset!: Date;
  @Getter('announcement', { namespace: 'template' })
  private announcement!: string;

  @Getter('submitInfo', { namespace: 'template' }) private submitInfo!: string;
  @Getter('openSubmit', { namespace: 'template' }) private openSubmit!: string;
  @Getter('loudly', { namespace: 'template' }) private loudly!: string;

  private transitionDirect: TransitionDirect = TransitionDirect.SLIDE_LEFT;

  public async mounted () {
    this.autoDetectMetaOg()
    this.detectPopupFromLoadURL()
    this.assignThemePrefixToBody(this.theme)
    this.detectAppMode()
    this.detectDeviceType()
    this.detectLanguage()
    window.addEventListener('resize', this.detectDeviceType)

    await this.detectSystemPrefersColorSchema()

    window.matchMedia('(prefers-color-scheme: dark)').addListener(async () => {
      await this.detectSystemPrefersColorSchema()
    })

    this.announcementCookieHook()
  }

  @Watch('$route')
  public onChangeRoute (to: Route, from: Route) {
    this.autoDetectMetaOg()
    this.detectPopupFromLoadURL()
    this.detectTransitionDirect(to, from)
    this.detectLanguage()
  }

  @Watch('isPopup')
  public onChangePopup (value: boolean) {
    this.toggleBodyLock(value)
  }

  @Watch('theme')
  public onThemeChange (theme: ThemeType) {
    this.assignThemePrefixToBody(theme)
  }

  @Watch('language')
  public onLanguageChange (language: string) {
    document.documentElement.setAttribute('lang', language)
    this.$router.replace({
      name: this.$route.name,
      params: {
        language
      }
    }).catch()
  }

  public destroyed () {
    window.removeEventListener('resize', this.detectDeviceType)
  }

  private isInApp (): boolean {
    return this.mode === AppMode.APP
  }

  private detectLanguage (): void {
    const language = this.$route.params.language
    if (!Object.keys(languages).includes(language)) {
      this.$router.replace(`/${LanguageType.default}`)
      return
    }
    this.setLanguage(language)
    document.documentElement.setAttribute('lang', this.language)
  }

  private detectedEgg (): boolean {
    const now: Date = new Date()

    return (
      now.getTime() > new Date('2019-10-26').getTime() &&
      now.getTime() < new Date('2019-11-27').getTime()
    )
  }

  private detectAppMode (): void {
    const isApp: boolean = this.$route.query.mode === 'app'

    if (isApp) {
      this.toggleMode(AppMode.APP)
    } else {
      this.toggleMode(AppMode.WEB)
    }
  }

  private detectDeviceType (): void {
    const mobileMaxWidth = getComputedStyle(document.documentElement).getPropertyValue('--mobile-max-width')
    const isMobile: boolean = window.matchMedia(`(max-width: ${mobileMaxWidth})`).matches

    if (isMobile) {
      this.toggleDevice(DeviceType.MOBILE)
    } else {
      this.toggleDevice(DeviceType.DESKTOP)
    }
  }

  private async detectSystemPrefersColorSchema (): Promise<void> {
    const isDarkMode: boolean = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const isLightMode: boolean = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches

    if (isLightMode) {
      this.detectedEgg()
        ? this.toggleTheme(ThemeType.RAINBOW_LIGHT)
        : this.toggleTheme(ThemeType.LIGHT)
    } else if (isDarkMode) {
      this.detectedEgg()
        ? this.toggleTheme(ThemeType.RAINBOW_DARK)
        : this.toggleTheme(ThemeType.DARK)
    } else {
      await this.getSunRiseSunSetData()
      this.toggleThemeViaSunRiseSunSet()

      setInterval(() => {
        this.toggleThemeViaSunRiseSunSet()
      }, 1000)
    }
  }

  private toggleThemeViaSunRiseSunSet (): void {
    const now = new Date()
    const isEgg: boolean = this.detectedEgg()
    const isDay: boolean =
      now.getTime() > this.sunrise.getTime() &&
      now.getTime() < this.sunset.getTime()

    let themePrefix = ''

    if (isEgg) {
      themePrefix = 'RAINBOW_'
    } else {
      themePrefix = ''
    }

    if (isDay) {
      themePrefix += 'LIGHT'
    } else {
      themePrefix += 'DARK'
    }

    this.toggleTheme(ThemeType[themePrefix as keyof typeof ThemeType])
  }

  private assignThemePrefixToBody (theme: ThemeType): void {
    const bodyDOM = document.querySelector('body') as HTMLElement
    bodyDOM.classList.remove('theme-dark')
    bodyDOM.classList.remove('theme-light')
    bodyDOM.classList.remove('theme-rainbow-dark')
    bodyDOM.classList.add(`theme-${theme}`)
  }

  private detectPopupFromLoadURL (): void {
    if (this.$route.query && this.$route.query.popUp) {
      switch (this.$route.query.popUp) {
        case 'submitInfo':
          this.togglePopupContent(this.submitInfo)
          this.togglePopup(true)
          break
        case 'openSubmit':
          this.togglePopupContent(this.openSubmit)
          this.togglePopup(true)
          break
        case 'loudly':
          this.togglePopupContent(this.loudly)
          this.togglePopup(true)
          break
        case 'announcement':
          this.togglePopupContent(this.announcement)
          this.togglePopup(true)
          break
        default:
          break
      }
    }
  }

  private detectTransitionDirect (to: Route, from: Route): void {
    if (to.meta.index < from.meta.index) {
      this.transitionDirect = TransitionDirect.SLIDE_RIGHT
    } else {
      this.transitionDirect = TransitionDirect.SLIDE_LEFT
    }
  }

  private toggleBodyLock (isLock: boolean): void {
    if (isLock) {
      (document.querySelector('body') as HTMLElement).classList.add(
        'popup-scrolling-lock'
      )
    } else {
      (document.querySelector('body') as HTMLElement).classList.remove(
        'popup-scrolling-lock'
      )
    }
  }

  private autoDetectMetaOg (): void {
    head.reset()
    switch (this.$route.name) {
      case 'Home':
        break

      case 'Agenda':
        head.title('議程表')
        head.ogTitle('議程表')
        head.ogUrl('https://coscup.org/2020/agenda/')

        break

      case 'Map':
        head.title('會場地圖')
        head.ogTitle('會場地圖')
        head.ogUrl('https://coscup.org/2020/map/')

        break

      case 'Staff':
        head.title('工作人員')
        head.ogTitle('工作人員')
        head.ogUrl('https://coscup.org/2020/staff/')

        break

      case 'Sponsor':
        head.title('贊助')
        head.ogTitle('贊助')
        head.ogUrl('https://coscup.org/2020/sponsor/')

        break

      case 'Venue':
        head.title('交通方式')
        head.ogTitle('交通方式')
        head.ogUrl('https://coscup.org/2020/venue/')

        break

      default:
        break
    }
  }

  private setAnnouncementCookie (): void {
    this.$cookies.set(
      'announcement',
      'af7f1055-f3ab-469b-8f96-a0a0b47095a2',
      Infinity,
      '*',
      'coscup.org'
    )

    // Fix Safari
    this.$cookies.set(
      'announcement',
      'af7f1055-f3ab-469b-8f96-a0a0b47095a2',
      Infinity,
      '',
      'coscup.org'
    )
  }

  private announcementCookieHook (): void {
    const announcementId: string = this.$cookies.get('announcement')

    if (announcementId !== 'af7f1055-f3ab-469b-8f96-a0a0b47095a2') {
      setTimeout(() => {
        this.$router.push({
          ...this.$route,
          query: { popUp: 'announcement' }
        })
      }, 1000)
      this.setAnnouncementCookie()
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
