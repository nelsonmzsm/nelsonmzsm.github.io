import type { CategoryId } from '../data/categories';
import { ja } from './ja';
import { easy } from './easy';
import { en } from './en';
import { vi } from './vi';
import { zhHant } from './zh-hant';
import { zhHans } from './zh-hans';
import { ko } from './ko';
import { id } from './id';
import { fil } from './fil';
import { my } from './my';
import { es } from './es';
import { pt } from './pt';

/**
 * 多言語対応（トップページのみ。取り組み記事の本文は日本語）。
 * 文言を直すときは src/i18n/<locale>.ts を編集する。
 * 言語を追加する場合：Locale と LOCALES に追加 → 辞書ファイル作成 → src/pages/<path>/index.astro を作成。
 */
export type Locale =
  | 'ja'
  | 'easy'
  | 'en'
  | 'vi'
  | 'zh-hant'
  | 'zh-hans'
  | 'ko'
  | 'id'
  | 'fil'
  | 'my'
  | 'es'
  | 'pt';

export const LOCALES: {
  code: Locale;
  path: string;
  htmlLang: string;
  label: string;
}[] = [
  { code: 'ja', path: '/', htmlLang: 'ja', label: '日本語' },
  { code: 'easy', path: '/easy/', htmlLang: 'ja', label: 'やさしい にほんご' },
  { code: 'en', path: '/en/', htmlLang: 'en', label: 'English' },
  { code: 'zh-hant', path: '/zh-hant/', htmlLang: 'zh-Hant', label: '中文（繁體）' },
  { code: 'zh-hans', path: '/zh-hans/', htmlLang: 'zh-Hans', label: '中文（简体）' },
  { code: 'ko', path: '/ko/', htmlLang: 'ko', label: '한국어' },
  { code: 'vi', path: '/vi/', htmlLang: 'vi', label: 'Tiếng Việt' },
  { code: 'id', path: '/id/', htmlLang: 'id', label: 'Bahasa Indonesia' },
  { code: 'fil', path: '/fil/', htmlLang: 'fil', label: 'Filipino' },
  { code: 'my', path: '/my/', htmlLang: 'my', label: 'မြန်မာဘာသာ' },
  { code: 'es', path: '/es/', htmlLang: 'es', label: 'Español' },
  { code: 'pt', path: '/pt/', htmlLang: 'pt-BR', label: 'Português' },
];

export interface Dict {
  meta: { title: string; description: string };
  nav: {
    services: string;
    about: string;
    projects: string;
    company: string;
    contact: string;
  };
  toolbar: {
    fontSize: string;
    fontSmall: string;
    fontNormal: string;
    fontLarge: string;
    language: string;
  };
  hero: {
    titleHtml: string;
    lead: string;
    cta: string;
    /** プロフィール下に並べる、人生とゆかりの深い言葉（資格・肩書き・ルーツ） */
    tags: string[];
  };
  news: { heading: string };
  /** できること：書く・編む／つなぐ／つくるの3項目。examplesは第二階層の例のリスト */
  services: {
    heading: string;
    lead: string;
    viewWorks: string;
    /** カード群の下に置く結びのひとこと（任意） */
    note?: string;
    /** quals: そのカードに対応する資格・経歴（任意） */
    /** price: 過去実績ベースの目安価格（任意。未設定のカードには表示しない） */
    items: { title: string; quals?: string; examples: string[]; price?: string }[];
  };
  about: {
    heading: string;
    lead: string;
    phases: { era: string; years: string; title: string; body: string }[];
  };
  projects: {
    heading: string;
    lead: string;
    /** 記事本文が日本語のみである旨の注記（ja以外で表示） */
    jaOnlyNote?: string;
    categories: Record<CategoryId, { label: string; description: string }>;
  };
  company: {
    heading: string;
    lead: string;
    toggle: string;
    labels: {
      name: string;
      philosophy: string;
      representative: string;
      founded: string;
      locationHq: string;
      locationTokyo: string;
      business: string;
    };
  };
  contact: {
    heading: string;
    lead: string;
    /** 「お仕事のご依頼を受け付けています」の安心感を出す一文 */
    workNote: string;
    topics: string[];
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
  };
  footer: { tagline: string };
  a11y: { toTop: string };
}

const dicts: Record<Locale, Dict> = {
  ja,
  easy,
  en,
  vi,
  'zh-hant': zhHant,
  'zh-hans': zhHans,
  ko,
  id,
  fil,
  my,
  es,
  pt,
};

export function getDict(locale: Locale): Dict {
  return dicts[locale];
}

export function localePath(locale: Locale): string {
  return LOCALES.find((l) => l.code === locale)!.path;
}
