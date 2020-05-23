/* eslint-disable @typescript-eslint/camelcase */
const { extractSheets } = require('spreadsheet-to-json')
const config = require('./config')

extractSheets(
  {
    spreadsheetKey: config.spreadsheetKey,
    sheetsToExtract: config.sheetsToExtract
  },
  function (err, data) {
    if (err) { console.error(err) } else {
      const { Sponsors: rawSponsors } = data
      const sponsors = rawSponsors
        .filter((rawSponsor) => {
          const { level, image, 'name:en': nameEn, 'name:zh-TW': nameZh, 'intro:en': introEn, 'intro:zh-TW': introZh, canPublish } = rawSponsor
          return !!(canPublish === 'Y' && level && image && (nameEn || nameZh) && (introEn || introZh))
        })
        .map((rawSponsor, index) => {
          return {
            id: `sponsor-${index}`,
            level: rawSponsor.level,
            name: {
              en: rawSponsor['name:en'] || rawSponsor['name:zh-TW'],
              'zh-TW': rawSponsor['name:zh-TW'] || rawSponsor['name:en']
            },
            intro: {
              en: rawSponsor['intro:en'] || rawSponsor['intro:zh-TW'],
              'zh-TW': rawSponsor['intro:zh-TW'] || rawSponsor['intro:en']
            },
            image: rawSponsor.image,
            link: rawSponsor.link
          }
        })
      console.log(JSON.stringify(sponsors, null, 4))
    }
  }
)
