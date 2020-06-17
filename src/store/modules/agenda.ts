import { ActionTree, GetterTree, MutationTree, Module } from 'vuex'

import { AgendaState, Session, SessionData, SpeakerData, TagData, SessionTypeData, RoomData } from '../types/agenda'
import { RootState } from '../types/root'
// import * as mutationTypes from '../mutation-types'
import agendaData from '@/../public/json/session.json'

const { sessions, rooms } = (() => {
  const sessionsData: SessionData[] = agendaData.sessions
  const roomsData: RoomData[] = agendaData.rooms
  const tagsData: TagData[] = agendaData.tags
  const sessionTypesData: SessionTypeData[] = agendaData.session_types
  const speakersData: SpeakerData[] = agendaData.speakers

  function fixedTaiwanHour (date: Date): Date {
    date.setHours(date.getHours() + 8 + (date.getTimezoneOffset() / 60))
    return date
  }

  return {
    rooms: roomsData,
    sessions: sessionsData
      .filter((sessionData) => sessionData.type !== null || sessionData.room !== null)
      .map<Session>((sessionData) => {
        return {
          ...sessionData,
          type: sessionTypesData.find((sessionTypeData) => sessionData.type === sessionTypeData.id)!,
          room: roomsData.find((roomData) => sessionData.room === roomData.id)!,
          tags: tagsData.filter((tagData) => sessionData.tags.includes(tagData.id)) || null,
          speakers: speakersData.filter((speakerData) => sessionData.speakers.includes(speakerData.id)) || null,
          start: fixedTaiwanHour(new Date(Date.parse(sessionData.start))),
          end: fixedTaiwanHour(new Date(Date.parse(sessionData.end)))
        }
      })
  }
})()

const namespaced = true

const state: AgendaState = {
  sessions,
  rooms
}

const getters: GetterTree<AgendaState, RootState> = {
  sessions: (state) => state.sessions,
  rooms: (state) => state.rooms
}

const actions: ActionTree<AgendaState, RootState> = {
}

const mutations: MutationTree<AgendaState> = {
}

export const agenda: Module<AgendaState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
