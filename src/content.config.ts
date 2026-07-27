import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 取り組み（Projects）コレクション
 * - 1ファイル＝1取り組み。src/content/projects/ に Markdown を置く。
 * - 追加手順は CLAUDE.md を参照。
 * - 将来 microCMS に移行する場合も、このスキーマが型の基準になる。
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(['mediaOps', 'contrib', 'tabunka', 'digital']),
      period: z.string(), // 例: "2013〜2019" "2023〜現在"
      summary: z.string().max(120), // カードに載る一行紹介
      format: z.enum(['booklet', 'tool']).optional(), // カード上に「冊子」「ツール」バッジを出す場合に指定
      thumbnail: z.array(image()).optional(), // 複数枚あるときはカード上でスライド表示する
      cardLabel: z.string().optional(), // 写真がない場合、カードに表示する短い文字（未指定ならタイトルの頭文字）
      cardColor: z.string().optional(), // cardLabel使用時の背景色（Tailwindクラス。未指定ならカテゴリの差し色）
      draft: z.boolean().default(false),
      order: z.number().default(99), // カテゴリ内の表示順（小さいほど先頭）
    }),
});

/**
 * 近況（News）コレクション
 * - 1ファイル＝1記事。src/content/news/ に Markdown を置く。
 * - トップページには新しい順に最新数件が表示される。
 */
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: z.string().max(120).optional(),
      thumbnail: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, news };
