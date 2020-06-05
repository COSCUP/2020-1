// tslint:disable: max-line-length

// !WARNING! DO NOT EDIT THIS TEMPLATE EXCEPT YOU UNDERSTAND WHAT ARE YOU ACTUALLY DO.
// This is a announcement template block, edit this and it will auto inject contents as popup-ready DOMElement.

import { markdown } from 'markdown'

const RAWContent = `
# COSCUP 2020 籌備團隊公告

---

參考資料：[疾管署－避免集會群聚感染，指揮中心公布「公眾集會因應指引」](https://www.cdc.gov.tw/Bulletin/Detail/vyRZfHHe_ZR9nMJxN8Nvrg)
`

const content = `
<script id="meta-content" type="application/json">
{
  "title": "COSCUP 2020 籌備團隊公告",
  "description": "COSCUP 2020 籌備團隊公告",
  "url": "https://coscup.org/2020/?popUp=announcement",
  "id": "af7f1055-f3ab-4694-8f96-a0a0c47095a2"
}
</script>
${markdown.toHTML(RAWContent)}
`

export default content
