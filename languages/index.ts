import en from './en'
import zhTW from './zh-TW'

export interface Language {
  languageSwitch: string;
  routesLabel: {
    'home': string;
    'agenda': string;
    'activity': string;
    'traffic': string;
    'venue': string;
    'staff': string;
    'sponsor': string;
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
