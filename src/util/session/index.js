const axios = require('axios')
const token = process.env.PRETALX_TOKEN

const pretalxOptions = { headers: { Authorization: 'Token ' + token } }

function genResult (talks, rooms, speakers) {
  const resRooms = rooms.results.map(r => {
    return {
      id: r.name.en.split(' ')[0],
      zh: {
        name: r.name['zh-tw']
      },
      en: {
        name: r.name.en
      }
    }
  })

  const resSpeakers = speakers.results.map(s => {
    return {
      id: s.code,
      avatar: s.avatar || 'https://coscup.org/2020/img/speaker/avatar/default.png',
      zh: {
        name: s.name,
        bio: s.biography || ''
      },
      en: {
        name: (s.answers.find(a => a.question.id === 468) || {}).answer || s.name,
        bio: (s.answers.find(a => a.question.id === 469) || {}).answer || s.biography || ''
      }
    }
  })

  const tracks = talks.results.map(s => s.track).filter((t, i, s) => i === s.findIndex(tt => tt['zh-tw'] === t['zh-tw'] && tt.en === t.en))
  const resSessionTypes = tracks.map(t => {
    return {
      id: Math.random().toString(36).substring(2, 8),
      zh: {
        name: t['zh-tw'] || t.en
      },
      en: {
        name: t.en || t['zh-tw']
      }
    }
  })

  const resTags = [
    {
      id: 'Beginer',
      zh: {
        name: '入門'
      },
      en: {
        name: 'Beginner'
      }
    },
    {
      id: 'Skilled',
      zh: {
        name: '中階'
      },
      en: {
        name: 'Skilled'
      }
    },
    {
      id: 'Advance',
      zh: {
        name: '進階'
      },
      en: {
        name: 'Advance'
      }
    }
  ]

  const resSessions = talks.results.map(s => {
    return {
      id: s.code,
      type: resSessionTypes.find(t => s.track['zh-tw'] === t.zh.name || s.track.en === t.en.name).id,
      room: s.slot.room.en.split(' ')[0],
      start: s.slot.start,
      end: s.slot.end,
      language: s.content_locale === 'zh-tw' ? '漢語' : 'English',
      zh: {
        title: s.title,
        description: s.abstract + '\n\n---\n\n' + s.description
      },
      en: {
        title: (s.answers.find(a => a.question.id === 465) || {}).answer || s.title,
        description: ((s.answers.find(a => a.question.id === 466) || {}).answer || s.abstract) +
        '\n\n---\n\n' + ((s.answers.find(a => a.question.id === 467) || {}).answer || s.description)
      },
      speakers: s.speakers.map(ss => ss.code),
      tags: s.answers.find(a => a.question.id === 413) !== undefined ? [s.answers.find(a => a.question.id === 413).options[0].answer.en] : []
    }
  })

  console.log(JSON.stringify({
    sessions: resSessions,
    speakers: resSpeakers,
    session_types: resSessionTypes, // eslint-disable-line
    rooms: resRooms,
    tags: resTags
  }))
}

Promise.all([
  axios.get('https://pretalx.com/api/events/coscup2020/talks/?limit=1000', pretalxOptions),
  axios.get('https://pretalx.com/api/events/coscup2020/rooms/?limit=1000', pretalxOptions),
  axios.get('https://pretalx.com/api/events/coscup2020/speakers/?limit=1000', pretalxOptions)
])
  .then((results) => {
    genResult(results[0].data, results[1].data, results[2].data)
  })
