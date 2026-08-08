/**
 * サイト全体のメタ情報。
 * ブランディング方針：「ネルソン水嶋」を前面に。
 * 合同会社オトナキは法人取引時の信用担保として Company セクションでのみ登場する。
 */
export const SITE = {
  name: 'ネルソン水嶋',
  legalName: '水嶋 健',
  companyName: '合同会社オトナキ',
  /** サイト名。日本語ページのヘッダーとog:site_nameに使う */
  siteName: 'ネルソン水嶋のこと',
  title: 'ネルソン水嶋のこと｜“あいだ”の編集者',
  description:
    '違いをおもしろがり、人をつなぐ「関係性の編集者」ネルソン水嶋（水嶋健）のサイト。ライター・編集、多文化共生・社会教育、AIを活用したアプリ開発。これまで形にしてきたプロジェクトと、人生のストーリーを紹介します。',
  url: 'https://nelsonmzsm.github.io',
  ogImage: '/ogp.png',
  sns: {
    x: 'https://x.com/nelson_mzsm',
    facebook: '', // TODO: 正しいアカウントURLに差し替え
    note: 'https://note.com/nelsonmzsm',
  },
} as const;
