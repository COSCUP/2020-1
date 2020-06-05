<template>
  <div id="staff" class="main-container staff-container">
    <div
      v-for="group in staffs"
      :key="`staff-group-${group.tid}`"
      class="group-box"
    >
      <h2 class="group-name">{{ languagePack.staff.groups[group.tid] }}</h2>
      <div class="staff-wrapper">
        <div
          v-for="chief in group.chiefs"
          :key="`${group.tid}-${chief.name}`"
          class="staff chief"
        >
          <img
            class="staff-avatar"
            :src="
              `https://www.gravatar.com/avatar/${chief.email_hash}?s=320&d=identicon&r=g`
            "
            :alt="`${chief.name}'s Avatar`"
          />
          <p>{{ chief.name }}</p>
        </div>
        <div
          v-for="member in group.members"
          :key="`${group.tid}-${member.name}`"
          class="staff"
        >
          <img
            class="staff-avatar"
            :src="
              `https://www.gravatar.com/avatar/${member.email_hash}?s=320&d=identicon&r=g`
            "
            :alt="`${member.name}'s Avatar`"
          />
          <p>{{ member.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Language } from '../../languages'

import staffData from '@/../public/json/staff.json'

@Component
export default class Staff extends Vue {
  @Getter('languagePack', { namespace: 'app' }) private languagePack!: Language;
  private get staffs () {
    const sequence = ['coordinator', 'secretary', 'program', 'field', 'finance', 'it', 'marketing', 'photo', 'sponsor', 'streaming']
    return staffData.sort((a, b) => sequence.indexOf(a.tid) - sequence.indexOf(b.tid))
  }
}
</script>
