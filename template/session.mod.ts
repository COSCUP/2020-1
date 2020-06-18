/* eslint-disable @typescript-eslint/no-use-before-define */
// tslint:disable: max-line-length

// !WARNING! DO NOT EDIT THIS TEMPLATE EXCEPT YOU UNDERSTAND WHAT ARE YOU ACTUALLY DO.
// This is a session template block, edit this and it will auto inject contents as popup-ready DOMElement.

import { markdown } from 'markdown'

export interface ISpeaker {
  id: string;
  avatar?: string;
  zh: {
    name: string;
    bio?: string;
  };
  en: {
    name: string;
    bio?: string;
  };
}

const content = (data: any, language: 'zh' | 'en'): string => {
  if (!data) return ''
  const description = `${data[language].description.split('\n')[0]}...`
  return `
${`<script id="meta-content" type="application/json">
{
  "title": "${data[language].title}",
  "description": "${description}",
  "url": "https://coscup.org/2020/agenda/${data.id}"
}
</script>`.replace('\n', '')}
<div>
  <span style="color: #3b9838; font-size: 1.25rem;">${getDay(data.start)}</span>
  <h1 class="title" style="margin-top: 8px; margin-bottom: 12px;"><span class="font-black" style="display: inline-block; margin-right: 1rem; line-height: 1.25;">${data[language].title}</span>${data.tags[0] ? `<span style="margin: 8px 0; display: inline-block; vertical-align: top; font-size: 0.8rem; padding: 8px 1rem; color: #fff; background-color: #3b9838; border-radius: 25px;">${data.tags[0][language].name}</span>` : ''}</h1>
  <h2 class="font-black" style="color: #3b9838; margin-bottom: 0;">${data.type[language].name}</h2>
  <div style="margin-bottom: 2rem;">
    <span class="font-black">${data.room[language].name.split(' / ')[0]}</span>
    <span style="margin-left: 1rem;">${formatTimeString(data.start, '：')} ~ ${formatTimeString(data.end, '：')}</span>
  </div>
  <hr />
</div>
<p class="paragraph">${contentParser(data[language].description)}</p>
${data.speakers.map((speaker: ISpeaker) => (speakerContent(speaker, language))).join('')}
`
}

const speakerContent = (speaker: ISpeaker, language: 'zh' | 'en'): string => `
<h1 class="title font-black">About ${speaker[language].name}</h1>
<div>
  <img class="speaker-avatar" src="${speaker.avatar}" alt="Speaker ${speaker[language].name}'s avatar">
  ${speaker[language].bio ? contentParser(speaker[language].bio!) : ''}
</div>
`

const contentParser = (content: string): string => (
  markdown.toHTML(content)
    .replace(/<p>/gm, '<p class="paragraph">')
    .replace(/<a /gm, '<a target="_blank" rel="noreferrer"')
)

const formatTimeString = (date: Date, joinChar = '') => {
  return [date.getHours(), date.getMinutes()]
    .map((digit) => digit.toString().padStart(2, '0')).join(joinChar)
}

const formatDateString = (date: Date, joinChar = '') => {
  return [date.getMonth() + 1, date.getDate()]
    .map((digit) => digit.toString().padStart(2, '0')).join(joinChar)
}

const getDay = (date: Date) => {
  const dateStr = formatDateString(date) as '0801' | '0802'
  const day = {
    '0801': 'Day 1',
    '0802': 'Day 2'
  }
  return `${day[dateStr]} (${dateStr})`
}

export default content
