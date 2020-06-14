// tslint:disable: max-line-length

// !WARNING! DO NOT EDIT THIS TEMPLATE EXCEPT YOU UNDERSTAND WHAT ARE YOU ACTUALLY DO.
// This is a announcement template block, edit this and it will auto inject contents as popup-ready DOMElement.

import { markdown } from 'markdown'

const RAWContent = {
  'zh-TW': `
# COSCUP COVID-19 防疫守則
>因應 COVID-19 疫情，COSCUP 參考中央流行疫情指揮中心的防疫措施，發布大會實體活動防疫守則。請您與我們一同遵守，保護自己與他人的健康。♥️
>
>防疫守則將視疫情發展與中央疫情疫情指揮中心指示有所變動，所有更動將不另通知，請在會前持續回來關心。最終版預計在 2020-07-20 發布。
>最新更新時間：2020-06-01

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
`,
  en: `
# Guidelines for Prevention and Protection of COVID-19 in the COSCUP
>COSCUP will follow the guidelines of prevention and control of COVID-19 issued by Central Epidemic Command Center (CECC). Please follow the instructions carefully to protect yourself and others. ♥️
>
>Following the instructions by the CECC, the modification might be made at anytime without notice, please come back to this page for regular update.
>Latest update: 2020-06-01

## Prevention and Protection Strategy
1. **Every participant should fill out the Personal Health Declaration Form.** After filling out the form, you will get your personal QR-Code and CODE NUMBER that will be used in our physical events. (The Personal Health Declaration Form will be open for submission on July, 20, 2020)
2. According to the CECC, a social distance of 1.5 meters(indoor) and 1 meter(outdoor) shall be maintained, and people are urged to wear facemasks in crowded and cofined spaces. **Every participant shall keep their facemask on during our events.**
3. **The contact-information-based measures will be implemented in our physical events**. Our Staff will scan your personal QR Code when you enter AU conference hall, 2nd floor to 5th floor of TR Building and the children playground.
4. **The number of people is limited in every room.** Only one entrance will be open for people to enter. Please follow the instructions and record your code number and timestamps.
5. If you don't feel well or under home isolation, quarantine or self-health management, please stay at home and have a good rest.

## For Participants
1. Fill out the Personal Health Declaration Form
2. Wear facemasks: Please keep your facemasks on during our events. Bringing more than one facemask is highly recommended.
3. Wash your hands frequently and spray 75 percent alcohol disinfectant to clean your hands and seats.
4. When you move to other spaces, please clean the desk before use.

## For COSCUP
1. COSCUP will use a diluted bleach solution to clean and disinfect all the venues and equipments.
2. Ear thermometers will be prepared at the information desk in TR Building. If you don't feel well, please go to check your body temperature.
3. 75 percent alcohol disinfectants are available on the registration desk and the information desk.

## Personal Data Protection Declaration
1. All the collected data are used to prevent COVID-19 and will be deleted after 28 days. The records of entering the buildings and session rooms are solely used in response to the pandemic. COSCUP will contact participants of a close or proximate contact of a confirmed or suspected case and provide the records for the local government and CECC of Taiwan.
2. [Data Protection Declaration of COSCUP](http://goo.gl/iSUJZC)
`
}

const content = (language: 'en' | 'zh-TW') => `
<script id="meta-content" type="application/json">
{
  "title": "COSCUP 2020 籌備團隊公告",
  "description": "COSCUP 2020 籌備團隊公告",
  "url": "https://coscup.org/2020/?popUp=announcement",
  "id": "af7f1055-f3ab-469b-8f96-a0a0b47095a2"
}
</script>
${markdown.toHTML(RAWContent[language])}
`

export default content
