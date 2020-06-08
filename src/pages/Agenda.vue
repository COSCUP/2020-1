<template>
  <div id="agenda" class="main-container">
    <nav class="days">
      <div
        class="day"
        :class="{ active: currentDay === day }"
        v-for="(day, index) in days"
        :key="`day-option-${day}`"
        @click="currentDay = day"
      >
        {{ `Day ${index + 1} (${day})` }}
      </div>
    </nav>
    <div
      class="schedule"
      :style="{
        '--length': rooms.length,
        '--cell-width': isMobile ? '100%' : '200px'
      }"
    >
      <div id="rooms" class="rooms-container">
        <ul class="rooms">
          <li class="room" v-for="room in rooms" :key="`room-${room.id}`">
            <div>Room</div>
            <div>{{ room[language].name.split(' / ')[0] }}</div>
          </li>
        </ul>
      </div>
      <div
        id="schedule-body"
        class="schedule-body-container"
      >
        <div class="schedule-body" :style="scheduleStyle">
          <div
            class="time-cell"
            v-for="time in startTimes"
            :key="`time-cell-${formatTimeString(time)}`"
            :style="getTimeCellStyle(time)"
          >
            <span>{{ formatTimeString(time, "：") }}</span>
          </div>
          <div
            v-for="session in sessions"
            :key="session.id"
            :id="session.id"
            :style="getSessionCellStyle(session)"
            class="schedule-cell"
            @click="onClickSession(session)"
          >
            <div class="schedule-cell-content-container">
              <section class="schedule-cell-content">
                <p v-show="!isMobile" class="period">
                  {{
                    `${formatTimeString(
                      session.start,
                      "："
                    )} ~ ${formatTimeString(session.end, "：")}`
                  }}
                </p>
                <p class="track" v-if="session.type">
                  {{ `${session.type[language].name}` }}
                </p>
                <header>
                  <h4 class="title">{{ session[language].title }}</h4>
                  <ul class="speakers" v-if="session.speakers">
                    <li
                      v-for="(speaker, index) in session.speakers"
                      :key="`${session.id}-speaker-${index}`"
                    >
                      {{ speaker[language].name }}
                    </li>
                  </ul>
                </header>
                <p v-show="isMobile" class="room">
                  {{ session.room[language].name.split(' / ')[0] }}
                </p>
                <p v-show="isMobile" class="length">
                  {{ `${getSessionPeriod(session)} mins` }}
                </p>

                <p
                  class="language"
                  v-show="isMobile"
                  v-if="
                    session.language
                  "
                >
                  {{ `${session.language.trim()}` }}
                </p>

                <div
                  class="difficulty"
                  v-if="
                      session.tags[0] &&
                      ['Beginner', 'Skilled', 'Advance'].includes(session.tags[0].id)
                  "
                >
                  <p :class="`difficulty__tag ${session.tags[0].id.toLowerCase()}`">
                    {{ `${session.tags[0][language].name}` }}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { groupBy } from 'lodash'
import { Route } from 'vue-router'

import { Component, Watch, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import sessionDOMString from '@/../template/session.mod'

import { DeviceType } from '@/store/types/app'
import { Session, RoomData } from '../store/types/agenda'

@Component
export default class Agenda extends Vue {
  @Action('togglePopup', { namespace: 'app' }) private togglePopup!: (status: boolean) => void;
  @Action('togglePopupContent', { namespace: 'app' }) private togglePopupContent!: (content: string) => void;
  @Action('setPopupOffsetTop', { namespace: 'app' }) private setPopupOffsetTop!: (offset: number) => Promise<void>;
  @Getter('isPopup', { namespace: 'app' }) private isPopup!: boolean;
  @Getter('device', { namespace: 'app' }) private device!: DeviceType;
  @Getter('popupOffsetTop', { namespace: 'app' }) private popupOffsetTop!: number;
  @Getter('language', { namespace: 'app' }) private _language!: string;
  @Getter('sessions', { namespace: 'agenda' }) private _sessions!: Session[]
  @Getter('rooms', { namespace: 'agenda' }) private rooms!: RoomData[]

  private popUp = false;
  private popUpSession = {};
  private currentDay = ''
  private tempScrollPosition = { x: 0, y: 0 }

  private get language () {
    if (this._language === 'zh-TW') {
      return 'zh'
    }
    return this._language
  }

  private get sessions () {
    return this._sessions
      .filter((session) => this.formatDateString(session.start) === this.currentDay)
      .sort((a, b) => +this.formatTimeString(a.start) - +this.formatTimeString(b.start))
  }

  private get days () {
    return Object.keys(groupBy(this._sessions, (session) => this.formatDateString(session.start)))
      .sort((a, b) => parseInt(a) - parseInt(b))
  }

  private get startTimes () {
    const starts = new Set<number>()
    const ends = new Set<number>()
    this.sessions.forEach((session) => {
      starts.add(session.start.getTime())
      ends.add(session.end.getTime())
    })
    return [...starts].sort().map((ms) => new Date(ms))
  }

  private get times () {
    const starts = new Set<number>()
    const ends = new Set<number>()
    this.sessions.forEach((session) => {
      starts.add(session.start.getTime())
      ends.add(session.end.getTime())
    })
    return [...new Set([...starts, ...ends])].sort().map((ms) => new Date(ms))
  }

  private get startTimeSessionCountMap () {
    return Object.fromEntries(
      Object.entries(
        groupBy(this.sessions, (session) => this.formatTimeString(session.start))
      )
        .map((entry) => [entry[0], entry[1].length])
    )
  }

  private get isMobile (): boolean {
    return this.device === DeviceType.MOBILE
  }

  @Watch('popUp')
  public async onChangeInnerPopup (popuped: boolean) {
    if (popuped) {
      await this.setPopupOffsetTop(window.scrollY)
      this.$router.push({ name: 'AgendaView', params: { language: this._language, sid: (this.popUpSession as any).id } })
    }
  }

  @Watch('isPopup')
  public async onChangePopup (isPopup: boolean) {
    if (isPopup && this.$route.name!.includes('Agenda')) {
      this.$router.push({ name: 'AgendaView', params: { language: this._language, sid: (this.popUpSession as any).id } })
    } else if (this.$route.name!.includes('Agenda')) {
      this.$router.push({ name: 'Agenda', params: { language: this._language } })
      window.scroll(this.tempScrollPosition.x, this.tempScrollPosition.y)
    }
  }

  @Watch('$route')
  public onChangeRoute (route: Route) {
    if (route.name === 'AgendaView') {
      this.processPopup()
      this.togglePopup(true)
    } else if (route.name === 'Agenda') {
      this.popUp = false
      this.togglePopup(false)
      this.togglePopupContent('')
    }
  }

  public mounted () {
    this.currentDay = this.days[0]
    this.handleSessionPopup()
  }

  private formatDateString (date: Date, joinChar = '') {
    return [date.getMonth() + 1, date.getDate()]
      .map((digit) => digit.toString().padStart(2, '0')).join(joinChar)
  }

  private formatTimeString (date: Date, joinChar = '') {
    return [date.getHours(), date.getMinutes()]
      .map((digit) => digit.toString().padStart(2, '0')).join(joinChar)
  }

  private getSessionPeriod (session: Session) {
    return Math.floor((session.end.getTime() - session.start.getTime()) / 1000 / 60)
  }

  private get scheduleStyle () {
    if (this.isMobile) {
      return {
        'grid-template-rows': this.startTimes
          .map((time) => {
            const sessionCount = this.startTimeSessionCountMap[this.formatTimeString(time)]
            return `[t${this.formatTimeString(time)}]${' auto'.repeat(sessionCount + 1)}`
          })
          .join(' '),
        'grid-template-columns': '120px auto'
      }
    }
    return {
      'grid-template-areas': `"${this.rooms.map((room) => `r-${room.id}`).join(' ')}"`,
      'grid-template-rows': this.times
        .map((time) => `[t${this.formatTimeString(time)}] minmax(1em, auto)`)
        .join(' '),
      'grid-template-columns': 'repeat(var(--length), var(--cell-width))'
    }
  }

  private getTimeCellStyle (time: Date) {
    return {
      'grid-row-start': `t${this.formatTimeString(time)}`
    }
  }

  private getSessionCellStyle (session: Session) {
    if (this.isMobile) return {}
    return {
      'grid-column': `r-${session.room.id}`,
      'grid-row-start': `t${this.formatTimeString(session.start)}`,
      'grid-row-end': `span t${this.formatTimeString(session.end)}`
    }
  }

  private onClickSession (session: Session) {
    this.popUpSession = session

    this.tempScrollPosition = { x: window.scrollX, y: window.scrollY }
    this.togglePopup(true)
  }

  private processPopup (): void {
    const targetSessionId = this.$route.params.sid as string
    const targetSession = this._sessions.filter((session) => session.id === targetSessionId)[0]
    this.togglePopupContent(sessionDOMString(targetSession, this.language as 'zh' | 'en'))
    this.togglePopup(true)
  }

  private handleSessionPopup (): void {
    if (this.$route.params.sid) {
      this.popUpSession = this._sessions.filter((session) => (session.id === this.$route.params.sid))[0]
      this.processPopup()
    }
  }

  private deepCopy (obj: any): any {
    return JSON.parse(JSON.stringify(obj))
  }
}
</script>
