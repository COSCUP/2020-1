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

const content = (data: any, language: 'zh' | 'en'): string => data ? `
<script id="meta-content" type="application/json">
{
  "title": "${data[language].title}",
  "description": "${data[language].description.replace(/\n/gm, '')}",
  "url": "https://coscup.org/2020/agenda/${data.id}"
}
</script>
<h1 class="title font-black">${data[language].title}</h1>
<p class="paragraph">${contentParser(data[language].description)}</p>
${data.speakers.map((speaker: ISpeaker) => (speakerContent(speaker, language))).join('')}
` : ''

const speakerContent = (speaker: ISpeaker, language: 'zh' | 'en'): string => `
<h1 class="title font-black">About ${speaker[language].name}</h1>
${speaker[language].bio ? contentParser(`![Speaker ${speaker[language].name}'s avatar](${speaker.avatar})` + speaker[language].bio) : ''}
`

const contentParser = (content: string): string => (
  markdown.toHTML(content)
    .replace(/<p>/gm, '<p class="paragraph">')
    .replace(/<a /gm, '<a target="_blank" rel="noreferrer"')
)

export default content
