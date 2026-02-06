# Slackメンション対応管理アプリ - 学習ガイド

このプロジェクトは**あなた自身が手を動かして学ぶ**ことを目的としています。
Claudeはコードを書かず、ガイド・レビュー・質問への回答を行います。

## 進め方

1. 各フェーズのタスクを**あなたが実装**
2. 実装したら「レビューして」と依頼
3. 詰まったら質問（ヒントを出します）
4. 完了したら次のフェーズへ

---

## Phase 1: プロジェクト基盤セットアップ

### Task 1-1: パッケージインストール
以下のコマンドを実行してください。

```bash
# 状態管理・API
npm install zustand @tanstack/react-query axios

# スタイリング
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Lint/Format（Biome）
npm install -D --save-exact @biomejs/biome
npx @biomejs/biome init

# テスト
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event

# API
npm install -D json-server
```

### Task 1-2: ESLint削除（Biomeに移行）
```bash
npm uninstall eslint eslint-plugin-react-hooks eslint-plugin-react-refresh @eslint/js typescript-eslint globals
rm eslint.config.js
```

### Task 1-3: Biome設定
`biome.json` を以下の内容で編集してください：
- シングルクォート使用
- セミコロンなし
- インデント: スペース2つ

### Task 1-4: package.json にscripts追加
```json
"lint": "biome lint ./src",
"format": "biome format --write ./src",
"check": "biome check --write ./src"
```

### Task 1-5: Tailwind CSS設定
- `tailwind.config.js` の content を設定
- `src/index.css` に Tailwind ディレクティブ追加

### Task 1-6: ディレクトリ構成作成
```
src/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   └── services/
├── application/
│   ├── use-cases/
│   ├── ports/
│   └── dtos/
├── infrastructure/
│   ├── slack/
│   ├── repositories/
│   └── api/
├── presentation/
│   ├── components/
│   ├── hooks/
│   ├── stores/
│   └── pages/
├── shared/
│   ├── types/
│   └── constants/
└── di/
```

### Task 1-7: 環境変数設定
`.env.local` を作成し、`.gitignore` に追加されているか確認。

**完了したら「Phase 1完了、レビューして」と言ってください。**

---

## Phase 2: Slack App作成・設定

### Task 2-1: Slack App作成
1. https://api.slack.com/apps にアクセス
2. 「Create New App」→「From scratch」
3. App Name: `mention-manager`（任意）
4. ワークスペース選択

### Task 2-2: Bot Token Scopes設定
「OAuth & Permissions」で以下を追加：
- `channels:history`
- `channels:read`
- `users:read`

### Task 2-3: インストール
「Install to Workspace」→ Bot User OAuth Token（xoxb-...）をコピー

### Task 2-4: 環境変数設定
`.env.local` に追加：
```
VITE_SLACK_BOT_TOKEN=xoxb-your-token
VITE_SLACK_CHANNEL_ID=C0123456789
```

**完了したら「Phase 2完了」と言ってください。**

---

## Phase 3: Domain層の実装

### Task 3-1: MentionStatus 値オブジェクト
`src/domain/value-objects/MentionStatus.ts` を作成。
4つのステータスを定義：
- `pending`（未対応）
- `in_progress`（対応中）
- `completed`（完了）
- `skipped`（対応不要）

### Task 3-2: Mention エンティティ
`src/domain/entities/Mention.ts` を作成。
必要なプロパティを考えて実装してください。

### Task 3-3: User エンティティ
`src/domain/entities/User.ts` を作成。

### Task 3-4: ユニットテスト
Vitestでエンティティのテストを書いてください。

**実装したら「Domain層レビューして」と言ってください。**

---

## Phase 4: Infrastructure層の実装

### Task 4-1: HTTPクライアント
`src/infrastructure/api/httpClient.ts` を作成。

### Task 4-2: Slack APIクライアント
`src/infrastructure/slack/SlackClient.ts` を作成。
`conversations.history` を呼び出す関数を実装。

### Task 4-3: MentionRepository
`src/infrastructure/repositories/MentionRepository.ts` を作成。
json-serverとの連携を実装。

### Task 4-4: db.json作成
プロジェクトルートに `db.json` を作成。

**実装したら「Infrastructure層レビューして」と言ってください。**

---

## Phase 5: Application層の実装

### Task 5-1: ポート（インターフェース）定義
- `src/application/ports/IMentionRepository.ts`
- `src/application/ports/ISlackGateway.ts`

### Task 5-2: UseCase実装
- `GetMentions.ts`
- `TakeOwnership.ts`（俺がやるぜ）
- `CompleteMention.ts`
- `SkipMention.ts`

**実装したら「Application層レビューして」と言ってください。**

---

## Phase 6: Presentation層の実装

### Task 6-1: Zustandストア
`src/presentation/stores/mentionStore.ts` を作成。

### Task 6-2: MentionCard コンポーネント
- 「俺がやるぜ」ボタン
- React 19 `useOptimistic` を使用

### Task 6-3: MentionList コンポーネント

### Task 6-4: FilterBar コンポーネント
- React 19 `useTransition` を使用

### Task 6-5: DashboardPage
全体をまとめるページコンポーネント。

**実装したら「Presentation層レビューして」と言ってください。**

---

## Phase 7: テスト・仕上げ

### Task 7-1: コンポーネントテスト
Testing Libraryでテストを書いてください。

### Task 7-2: 動作確認
```bash
# ターミナル1
npm run dev

# ターミナル2
npx json-server --watch db.json --port 3001
```

---

## Claudeへの依頼方法

| やりたいこと | 言い方 |
|-------------|--------|
| レビュー依頼 | 「〇〇をレビューして」 |
| ヒントが欲しい | 「〇〇のヒントをください」 |
| エラー解決 | 「このエラーの原因は？」+ エラー内容 |
| 設計相談 | 「〇〇はどう設計すべき？」 |
| コード例が欲しい | 「〇〇のコード例を見せて」 |

## 学習のコツ

1. **まず自分で考える** - 5分考えてから質問
2. **エラーは読む** - エラーメッセージを貼って質問
3. **小さく進める** - 1タスクずつ完了させる
4. **テストを書く** - 動作確認はテストで
