const titleDOM = document.querySelector('head>title') as HTMLElement
const metaDOM = Array.from(document.querySelectorAll('head>meta')) as HTMLElement[]

const headPayload = {
  title: titleDOM,
  'og:title': metaDOM[3],
  'og:description': metaDOM[4],
  'og:url': metaDOM[5],
  'og:image': metaDOM[6],
  'og:type': metaDOM[7],
  'og:site_name': metaDOM[8]
}

const defaultValue = {
  title: 'COSCUP 2020 | Conference for Open Source Coders, Users, and Promoters',
  description: 'Conference for Open Source Coders, Users, and Promoters is a free annual conference providing a platform to connect FLOSS folks across Asia since 2006. It\'s a major force of free software movement advocacy in Taiwan.',
  url: 'https://coscup.org/2020',
  image: 'https://coscup.org/2020/img/og.png',
  type: 'website',
  siteName: 'COSCUP 2020'
}

const head = {
  reset () {
    headPayload.title.innerText = defaultValue.title
    headPayload['og:title'].setAttribute('content', defaultValue.title)
    headPayload['og:description'].setAttribute('content', defaultValue.description)
    headPayload['og:url'].setAttribute('content', defaultValue.url)
    headPayload['og:image'].setAttribute('content', defaultValue.image)
    headPayload['og:type'].setAttribute('content', defaultValue.type)
    headPayload['og:site_name'].setAttribute('content', defaultValue.siteName)
  },
  title (text: string) {
    headPayload.title.innerText = `${text} - ${defaultValue.title}`
  },
  ogTitle (text: string) {
    headPayload['og:title'].setAttribute('content', `${text} - ${defaultValue.title}`)
  },
  ogDescription (text: string) {
    headPayload['og:description'].setAttribute('content', text)
  },
  ogImage (link: string) {
    headPayload['og:image'].setAttribute('content', link)
  },
  ogType (text: string) {
    headPayload['og:type'].setAttribute('content', text)
  },
  ogSiteName (text: string) {
    headPayload['og:site_name'].setAttribute('content', text)
  },
  ogUrl (link: string) {
    headPayload['og:url'].setAttribute('content', link)
  }
}

export default head
