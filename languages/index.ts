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

  home: {
    info: {
      venue: string;
      tabs: {
        announcement: string;
        registration: string;
        donate: string;
      };
    };
    about: {
      title: string;
      content: string;
    };
  };

  sponsor: {
    callForSponsorship: {
      title: string;
      content: string;
    };
    level: {
      titanium: string;
      diamond: string;
      gold: string;
      silver: string;
      bronze: string;
      'co-organizer': string;
      'special-thanks': string;
    };
  };

  venue: {
    title: string;
    name: string;
    address: string;
    plans: {
      [name: string]: string;
    };
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
