import en from './en'
import zhTW from './zh-TW'

export interface Language {
  languageSwitch: string;

  menu: {
    home: string;
    agenda: string;
    map: string;
    venue: string;
    sponsor: string;
    staff: string;
    blog: string;
    'press-release': string;
    coc: string;
  };
  footer: {
    websites: string;
    social: string;
  };
}

export enum LanguageType {
  'default' = 'zh-TW',
  'en' = 'en',
  'zh-TW' = 'zh-TW'
}

export const languages: { [key: string]: Language } = {
  en,
  'zh-TW': zhTW
}
