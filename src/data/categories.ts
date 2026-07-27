/**
 * 取り組みのカテゴリ定義（構造のみ。表示名・説明文は src/i18n/<locale>.ts 側にある）。
 * カテゴリを増やす場合：ここに追加 → src/content.config.ts の enum に同じ id を追加
 * → 各言語辞書の projects.categories にラベルを追加。
 */
export type CategoryId = 'mediaOps' | 'contrib' | 'tabunka' | 'digital';

export const CATEGORIES: {
  id: CategoryId;
  accent: string; // Tailwindの色クラス（カードの差し色）
}[] = [
  { id: 'mediaOps', accent: 'bg-umi' },
  { id: 'contrib', accent: 'bg-kin' },
  { id: 'tabunka', accent: 'bg-akatsuchi' },
  { id: 'digital', accent: 'bg-gajumaru' },
];
