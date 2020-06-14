import { LanguageType } from 'languages'

export interface TemplateState {
  announcement: (language: 'en' | 'zh-TW') => string;
  submitInfo: string;
  openSubmit: string;
  loudly: string;
}
