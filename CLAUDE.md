# nelson-site（ネルソン水嶋 ポートフォリオサイト）

ネルソン水嶋（水嶋健／合同会社オトナキ）のポートフォリオサイト。要件は [要件定義書.md](要件定義書.md) を参照。

- ブランディング：「ネルソン水嶋」を前面に。肩書きは「“あいだ”の編集者」（ロゴ・タイトルタグ）。ヒーロー見出しの動詞形コピーは「“あいだ”で、つくって、つなぐ。」。オトナキは Company セクションのみ（法人取引の信用担保）
- 技術：Astro 5 + Tailwind CSS v4（`src/styles/global.css` の `@theme` でデザイントークン定義。アクセントは umi/akatsuchi/gajumaru/kin の4色）
- デプロイ：Cloudflare Pages（GitHub連携、mainへのpushで自動デプロイ）※初回セットアップは未実施
- デザインの軸：「やさしさ（島の支え合い・アースカラー）」×「マンガ的なキレ（マーカー強調・ドリアンマン）」の二面性。ダンディ・モノクロ方向には寄せない
- ページ構成の順（Home.astro）：Hero → News（最近のこと） → About（ネルソンのこと） → Projects（やってきたこと） → Services（できること） → Company（会社概要） → Contact（ご相談）

## 多言語・閲覧支援（島の高齢者にも読みやすく）

- トップページは12言語：`/`（日本語）、`/easy/`（やさしいにほんご）、`/en/`、`/zh-hant/`（繁体字）、`/zh-hans/`（簡体字）、`/ko/`、`/vi/`、`/id/`、`/fil/`、`/my/`（ミャンマー語）、`/es/`、`/pt/`
- 文言はすべて `src/i18n/<locale>.ts` の辞書にある。**文言修正はコンポーネントではなく辞書を編集する**
- やさしいにほんご（easy）のルール：短い文・分かち書き・むずかしい言葉を使わない
- **名前の表記ルール**：「健」は「けん」と読まない。ふりがな・ローマ字は「ねるそん みずしま」「Nelson Mizushima」を使う
- 翻訳はClaude製の初版。公開前にネイティブチェック推奨（特にミャンマー語・フィリピン語）
- 取り組み記事の本文は日本語のみ（詳細ページは ja 固定。他言語トップには「記事は日本語」の注記が出る）
- 文字サイズ切替：ヘッダーの「あ」ボタン3段階（小100%／標準122%＝既定／大145%）。`html[data-fontsize]` + localStorage
- 言語を追加する場合：`src/i18n/index.ts` の `Locale`/`LOCALES` に追加 → 辞書ファイル作成 → `src/pages/<locale>/index.astro` を作成
- `dict.hero.lead` / `dict.about.lead` / `dict.services.note` / `dict.contact.lead` は本文中にリンクや強調タグを含められるよう、コンポーネント側で `set:html` 描画している（プレーンテキスト展開に戻すとHTMLタグがそのまま文字表示されるバグになるので注意）

## コマンド

- `npm run dev` — 開発サーバー（draft記事も表示される）
- `npm run build` — 本番ビルド（draft記事は除外される）
- `npm run preview` — ビルド結果の確認

## 取り組み（Projects）の追加手順

クライアントから「○○という取り組みを追加して」と依頼されたら：

1. `src/content/projects/<英語スラッグ>.md` を新規作成（スラッグがそのままURL `/projects/<スラッグ>/` になる）
2. frontmatter を書く：

```yaml
---
title: 取り組みの名前
category: mediaOps | contrib | tabunka | digital   # 下記カテゴリ参照
period: 2023〜現在                     # 表示用の自由テキスト
summary: カードに載る一行紹介（120字以内）
thumbnail: ./images/<スラッグ>.jpg     # 任意。無ければ色付きプレースホルダー表示（タイトル頭文字）
draft: true                            # 公開前・内容が薄い間は true。実質「準備中」の意味も兼ねる
order: 3                               # カテゴリ内の表示順（小さいほど上）
---
```

3. 本文は「## 背景」「## やったこと」「## いま思うこと」のような3部構成を基本に、読み物のトーンで書く（ビジネス臭・自慢臭は排除。本文中で `**太字**` は使わない — AI生成っぽく見えるため地の文で流す）
4. 画像は `src/content/projects/images/` に置き、frontmatter から相対パスで参照（Astroが自動最適化する）。画像が無ければ thumbnail 行ごと省略してよい（プレースホルダー表示になる）
5. `npm run build` が通ることを確認してから push（→自動デプロイ）

**回遊リンクの維持**：取り組みを追加したら、関連する人生の時期があれば `src/components/About.astro` の `phaseLinks` にも脚注リンクを追加する（第1期=東京SE、第2期=ベトナム、第3期=沖永良部、第4期=東京・現在）。

### カテゴリ（4分類・2026-07-22改訂）

`src/data/categories.ts` と `src/content.config.ts` の enum、および全12言語辞書の `projects.categories` が対応。4分類に増やした際、**「できること」の3項目（書く・編む／つなぐ／つくる）とは1:1対応しない**ため、`Services.astro` 内の `itemStyles[].projectCategory` で個別にリンク先カテゴリを指定している（書く・編む→mediaOps、つなぐ→tabunka、つくる→digital。contribは`やってきたこと`内でのみ表示され、できることカードからのリンクは無い）。

- `mediaOps` = メディア運営・伴走支援（アクセント色: umi）— べとまる、海外ZINE、SalmonS、えらぶ仕事図鑑
- `contrib` = 寄稿・連載・現地記者（アクセント色: kin＝新聞紙を思わせる黄土色）— デイリーポータルZ、奄美群島南三島経済新聞、NHK鹿児島、琉球新報、南海日日新聞、その他の寄稿先
- `tabunka` = 多文化共生・社会教育・郷土グッズ（アクセント色: akatsuchi）
- `digital` = アプリ・デジタル開発（AI活用）（アクセント色: gajumaru）

Projectsグリッドはスマホでも常に2カラム（`grid-cols-2 sm:... lg:grid-cols-4`）。1カラムに戻さないこと（クライアント要望：「一度に2〜4件は視界に入るように」）。

## 近況（News）の追加手順

1. `src/content/news/<YYYY-MM-スラッグ>.md` を新規作成（URLは `/news/<スラッグ>/`）
2. frontmatter：`title` / `date: 2026-07-01` / `summary`（任意・120字以内）/ `draft`（任意）
3. 本文は短めでOK。トップページには新しい順に最新4件が表示される

## 固定文言の編集場所

- 画面の文言（Hero・About・カテゴリ名・Contactの話題チップ等）：`src/i18n/ja.ts` ほか各言語辞書
- できることの3項目（書く・編む／つなぐ／つくる）：`dict.services.items[].{title, quals, examples}`。`examples` は第二階層の箇条書き配列（第一階層＝タイトルのみ、bodyの長文プローズは廃止した）
- サイト名・URL・SNSリンク：`src/data/site.ts`
- 会社の登記情報（値のみ、日本語共通）：`src/data/company.ts`
- フォーム送信先：`src/components/Contact.astro` の `FORM_ACTION`

## 設計方針（将来のCMS移行）

コンポーネントはデータ配列を受け取って描画するだけにし、データ取得は Content Collections（`src/content.config.ts`）に集約している。将来 microCMS に移行する場合は、データ取得層のみ差し替える。

## 未対応のTODO

- [ ] フォーム：FormSubmit（Gmail宛で暫定運用中。`Contact.astro` のコメント参照）設定済みだが、**初回送信時に届く確認メールのActivateリンクを踏む必要あり**。otonaki.com宛に戻す場合はお名前.com側でformsubmit.coの受信許可が必要
- [ ] SNSリンクの正しいURL：`src/data/site.ts`
- [ ] 写真の差し替え（すべてダミー）：
  - `src/assets/hero-bg.jpg` … ヒーロー背景。美しい海・自然の横位置写真（1920px幅以上推奨）
  - `src/assets/phase-1〜4.jpg` … 「ネルソンのこと」各時期の16:9写真
  - `src/assets/durian.png` … ナビ・フッター・上へ戻るボタンのドリアン。現在は本物のドリアン写真の切り抜き（CC BY-SA表記は削除済み。ユーザー提供画像に差し替え済みのため出典表記なし）
  - `src/content/projects/images/*.jpg` … 各取り組みのサムネイル（横位置16:9）。多くの新規記事（海外ZINE・SalmonS・寄稿先6本など）はまだ画像なしでプレースホルダー表示
- [ ] draft: true の3記事（えらぶのシンプルなTシャツ／じぶん年表／ひめくりえらぶ）は内容がほぼ空。実際の情報が集まったら本文を書き足して `draft` を外す
- [ ] 多言語翻訳のネイティブチェック（特に my / fil）
- [ ] Cloudflare Pages セットアップ＋Web Analyticsトークン（`Base.astro` のコメント部）
- [ ] 独自ドメイン決定後：`astro.config.mjs` の `site`、`public/robots.txt`、`src/data/site.ts` の `url` を差し替え
- [ ] 「寄稿・連載・現地記者」カテゴリの4記事（南三島経済新聞・NHK鹿児島・琉球新報・南海日日新聞の一部）は仮テキスト。実際の掲載記事・実績に差し替える
