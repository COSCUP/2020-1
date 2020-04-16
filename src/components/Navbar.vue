<template>
  <nav id="nav" class="navbar">
    <div class="navbar-container">
      <router-link class="logo" :to="{ name: 'Home', params: { language } }">
        <img class="logo-icon" src="/2020/img/logo-200.png" />
        <div class="logo-text">
          <div class="logo-text__conf font-bold">
            <span class="font-black">COSCUP</span>
          </div>
          <div class="logo-text__2020 font-bold">
            <span>2020</span>
          </div>
        </div>
      </router-link>
      <div class="menu" :class="{ toggled: isMenuShow }">
        <div class="menu-mask" @click.self="toggleMenu(false)"></div>
        <div class="menu-container">
          <header>
            <router-link class="define-logo" :to="{ name: 'Home', params: { language } }">
              <img class="define-icon" src="/2020/img/logo-200.png" />
              <div class="define-text">
                <div class="logo-text-container">
                  <span class="logo-text__conf">COSCUP</span>
                  <span class="logo-text__2020">2020</span>
                </div>
              </div>
            </router-link>
            <div class="close-button-container">
              <span class="close-button" @click.self="toggleMenu(false)"
                >+</span
              >
            </div>
          </header>
          <template v-for="menuLinkItem in menuLinkItems">
            <a
              v-if="menuLinkItem.isExternal"
              :key="menuLinkItem.name"
              :href="menuLinkItem.url"
              target="_blank"
              rel="noopener noreferrer"
              class="menu-item font-bold"
            >
              <span>
                {{ languagePack.menu[menuLinkItem.name] }}
                <font-awesome-icon :icon="['fas', 'external-link-alt']" />
              </span>
            </a>
            <router-link
              v-else
              :key="menuLinkItem.name"
              :to="{
                name: menuLinkItem.location.name,
                params: {
                  language
                }
              }"
              class="menu-item font-bold"
              :class="{
                active: $route.name.includes(menuLinkItem.location.name)
              }"
            >
              <span>{{ languagePack.menu[menuLinkItem.name] }}</span>
            </router-link>
          </template>
        </div>
      </div>
      <a class="language-switch menu-item font-bold" @click="switchLanguage">
        <span>
          {{ languagePack.languageSwitch }}
        </span>
      </a>
      <img
        src="@/assets/images/toggle-button.svg"
        class="toggle-button"
        @click="toggleMenu()"
      />
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Language, LanguageType } from '../../languages'
import { Location } from 'vue-router'

interface MenuLinkItem {
  name: string;
  isExternal: boolean;
}

interface MenuLinkItemExternal extends MenuLinkItem {
  url: string;
}

interface MenuLinkItemInternal extends MenuLinkItem {
  location: Location;
}

@Component
export default class Navbar extends Vue {
  @Action('setLanguage', { namespace: 'app' }) private setLanguage!: (language: string) => void
  @Getter('language', { namespace: 'app' }) private language!: string;
  @Getter('languagePack', { namespace: 'app' }) private languagePack!: Language;

  private isMenuShow = false
  private menuLinkItems: (MenuLinkItemInternal | MenuLinkItemExternal)[] = [
    {
      name: 'agenda',
      isExternal: false,
      location: {
        name: 'Agenda'
      }
    },
    {
      name: 'map',
      isExternal: false,
      location: {
        name: 'Map'
      }
    },
    {
      name: 'venue',
      isExternal: false,
      location: {
        name: 'Venue'
      }
    },
    {
      name: 'sponsor',
      isExternal: false,
      location: {
        name: 'Sponsor'
      }
    },
    {
      name: 'staff',
      isExternal: false,
      location: {
        name: 'Staff'
      }
    },
    {
      name: 'blog',
      isExternal: true,
      url: 'https://blog.coscup.org/'
    },
    {
      name: 'press-release',
      isExternal: true,
      url: 'https://blog.coscup.org/p/press-release.html'
    },
    {
      name: 'coc',
      isExternal: true,
      url: 'https://hackmd.io/s/SyCQqip2N'
    }
  ]

  private toggleMenu (newStatus: boolean | null = null) {
    this.isMenuShow = newStatus === null ? !this.isMenuShow : newStatus
  }

  @Watch('$route')
  public onChangeRoute () {
    this.toggleMenu(false)
  }

  private switchLanguage () {
    if (this.language === LanguageType.en) {
      this.setLanguage(LanguageType['zh-TW'])
    } else {
      this.setLanguage(LanguageType.en)
    }
  }
}
</script>
