// tslint:disable: max-line-length

// !WARNING! DO NOT EDIT THIS TEMPLATE EXCEPT YOU UNDERSTAND WHAT ARE YOU ACTUALLY DO.
// This is a announcement template block, edit this and it will auto inject contents as popup-ready DOMElement.

import { markdown } from 'markdown'

const RAWContent = `
# COSCUP COVID-19 防疫守則


> 因應 COVID-19 疫情，COSCUP 參考中央流行疫情指揮中心的防疫措施，發布大會實體活動防疫守則。請您與我們一同遵守，保護自己與他人的健康。♥️
>
> 防疫守則將視疫情發展與中央疫情疫情指揮中心指示有所變動，所有更動將不另通知，請在會前持續回來關心。最終版預計在 2020-07-20 發布。
> 最新更新時間：2020-06-01


## 防疫要點
1. **每位參與者須線上填寫個人(健康聲明表)**，填完健康聲明表可獲得專屬入場 QR Code 與代號，即能參與 COSCUP 2020 大會實體活動。(健康聲明表將在 2020-07-20 開放填寫)
2. 配合防疫措施：「保持社交距離（室內1.5公尺、室外1公尺），無法維持社交距離時，應戴口罩」，**參與者進入會場，應全程配戴口罩。**
3. **COSCUP 會場進出採實名制**，工作人員將在 AU 演講廳、TR 2 樓~5 樓、孩童遊憩區以掃描參與者入場 qrcode 方式，記錄各館人流情形。
4. **各議程廳採人數總量管制**，會議室僅開放 1 個門口進出，進出議程廳採實名制，請配合現場議程軌工作人員指示，登記您的參與者代號與進入時間。
5. 若有身體不適或具感染風險（居家隔離、居家檢疫、自主健康管理）等情形者，請在家裡好好休息，勿前往 COSCUP 會場。


## 參與者防疫準備
1. 填寫健康聲明書
2. 須攜帶口罩：進入會場應戴口罩，可以隨身多備 1~2 枚口罩。
3. 勤洗手，可搭配酒精消毒手部與座位。
4. 議程移動時，請大眾自行消毒桌面。

## 大會防疫準備
1. 大會前一天與第一天會議結束時，工作人員以漂白水做全區域消毒，消毒範圍包含：室內與走廊地板、門把、窗戶把手、按鈕、電器開關、課桌椅、洗手臺、樓梯扶手。
2. 大會服務處將備有額溫槍/耳溫槍，若有身體不適者，可前往服務台量測。
3. 大會報到處與服務台備有消毒用酒精，如有需要，可自行取用。

## 隱私聲明
1. 大會配合防疫期間所蒐集的資料，將在資料蒐集日起 28 天後刪除。參與者進出各館與各廳紀錄將作為疫情管控使用，若會後有任何疑似感染情況，大會將主動通知可能被影響的群眾，且得提供衛生主管機關依傳染病防治法等規定進行疫情調查及聯繫使用。
2. [COSCUP 隱私聲明](http://goo.gl/iSUJZC)
`

const content = `
<script id="meta-content" type="application/json">
{
  "title": "COSCUP 2020 籌備團隊公告",
  "description": "COSCUP 2020 籌備團隊公告",
  "url": "https://coscup.org/2020/?popUp=announcement",
  "id": "af7f1055-f3ab-469b-8f96-a0a0c47095a2"
}
</script>
${markdown.toHTML(RAWContent)}
`

export default content
