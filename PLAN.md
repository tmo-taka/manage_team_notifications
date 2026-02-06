# React 19 学習リポジトリ - Slackメンション対応管理アプリ 実装計画

## 概要
Slackの特定チャンネルからメンションメッセージを取得し、チームで対応状況を管理するアプリ。
「俺がやるぜ」ボタンで対応者を明示し、対応漏れを防ぐ。

## アプリの機能

### コア機能
1. **メンション一覧表示** - 特定チャンネルの@channel, @here, 個人メンションを取得
2. **対応状況管理** - 未対応 → 対応中 → 完了 / 対応不要
3. **対応者表示** - 「田中さんが対応中」のようにチームで共有
4. **リアルタイム更新** - 新しいメンションの自動取得

### ステータスフロー
```
未対応 ──「俺がやるぜ」──→ 対応中（対応者名表示）──→ 完了
    └──「対応不要」──→ 対応不要（スキップ）
```

## 技術スタック

| カテゴリ | 技術 | 理由 |
|---------|------|------|
| フレームワーク | React 19.2.0 | 新機能学習のため |
| ビルドツール | Vite | 高速、設定済み |
| 状態管理 | Zustand | 2025-2026年最も人気、軽量 |
| サーバー状態 | TanStack Query | APIキャッシュ、ポーリング対応 |
| バックエンド | json-server | 対応状況の永続化 |
| Slack連携 | Slack Web API | Bot Token使用 |
| テスト | Vitest + Testing Library | Viteと相性良好 |
| スタイリング | Tailwind CSS | 2025年最人気 |
| Lint/Format | Biome | ESLint+Prettier代替、高速、設定シンプル |
| 型 | TypeScript | 型安全性 |

## Slack API 設定

### 必要なBot Token Scopes
```
channels:history    - チャンネルのメッセージ履歴取得
channels:read       - チャンネル情報取得
users:read          - ユーザー情報取得（メンション者名表示用）
```

### 使用するAPI
- `conversations.history` - チャンネルのメッセージ取得
- `users.info` - ユーザー情報取得

## 学習できるReact 19新機能

1. **useOptimistic** - 「俺がやるぜ」押下時の楽観的更新
2. **useActionState** - ステータス変更フォームの状態管理
3. **useTransition** - フィルター/検索時の非ブロッキング更新
4. **use** - Slack APIレスポンスの直接使用

## ディレクトリ構成（クリーンアーキテクチャ）

```
my-app/
├── src/
│   ├── domain/                      # ビジネスロジック（React非依存）
│   │   ├── entities/
│   │   │   ├── Mention.ts           # メンションエンティティ
│   │   │   └── User.ts              # ユーザーエンティティ
│   │   ├── value-objects/
│   │   │   └── MentionStatus.ts     # ステータス値オブジェクト
│   │   └── services/
│   │       └── MentionFilter.ts     # フィルタリングロジック
│   │
│   ├── application/                 # ユースケース層
│   │   ├── use-cases/
│   │   │   ├── GetMentions.ts       # メンション取得
│   │   │   ├── TakeOwnership.ts     # 「俺がやるぜ」処理
│   │   │   ├── CompleteMention.ts   # 完了処理
│   │   │   └── SkipMention.ts       # 対応不要処理
│   │   ├── ports/
│   │   │   ├── IMentionRepository.ts
│   │   │   └── ISlackGateway.ts     # Slack API インターフェース
│   │   └── dtos/
│   │       └── MentionDto.ts
│   │
│   ├── infrastructure/              # 外部連携
│   │   ├── slack/
│   │   │   ├── SlackClient.ts       # Slack API クライアント
│   │   │   └── SlackGateway.ts      # Slack Gateway実装
│   │   ├── repositories/
│   │   │   └── MentionRepository.ts # json-server連携
│   │   └── api/
│   │       └── httpClient.ts
│   │
│   ├── presentation/                # UI層
│   │   ├── components/
│   │   │   ├── MentionList/
│   │   │   │   ├── MentionList.tsx
│   │   │   │   └── MentionList.test.tsx
│   │   │   ├── MentionCard/
│   │   │   │   ├── MentionCard.tsx  # 「俺がやるぜ」ボタン含む
│   │   │   │   └── MentionCard.test.tsx
│   │   │   ├── StatusBadge/
│   │   │   │   └── StatusBadge.tsx
│   │   │   └── FilterBar/
│   │   │       └── FilterBar.tsx
│   │   ├── hooks/
│   │   │   ├── useMentions.ts
│   │   │   └── useOptimisticStatus.ts
│   │   ├── stores/
│   │   │   ├── mentionStore.ts      # メンション状態
│   │   │   └── userStore.ts         # ログインユーザー
│   │   └── pages/
│   │       └── DashboardPage.tsx
│   │
│   ├── shared/
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── constants/
│   │       └── status.ts
│   │
│   └── di/
│       └── container.tsx
│
├── db.json                          # 対応状況の永続化
├── .env.local                       # Slack Token（gitignore）
├── biome.json                       # Biome設定
├── vitest.config.ts
└── package.json
```

## 実装フェーズ

### Phase 1: プロジェクト基盤セットアップ
1. 必要パッケージのインストール
   - Zustand, TanStack Query
   - Tailwind CSS
   - Vitest + Testing Library
   - json-server
   - axios（API呼び出し用）
   - Biome（Lint/Format）
2. Biome設定（biome.json）
3. ESLint削除（Biomeに移行）
4. Tailwind CSS設定
5. ディレクトリ構成作成
6. 環境変数設定（.env.local）

### Phase 2: Slack App 作成・設定
1. Slack Appの作成（api.slack.com）
2. Bot Token Scopesの設定
3. ワークスペースへのインストール
4. Bot Tokenの取得・設定

### Phase 3: Domain層の実装
1. Mentionエンティティ定義
2. MentionStatus値オブジェクト（未対応/対応中/完了/対応不要）
3. Userエンティティ
4. ユニットテスト

### Phase 4: Infrastructure層の実装
1. Slack APIクライアント作成
2. conversations.history でメンション取得
3. メンションフィルタリング（@channel, @here, 個人）
4. json-server で対応状況永続化

### Phase 5: Application層の実装
1. GetMentions UseCase
2. TakeOwnership UseCase（俺がやるぜ）
3. CompleteMention UseCase
4. SkipMention UseCase

### Phase 6: Presentation層の実装
1. Zustandストア作成
2. MentionCard コンポーネント
   - React 19 useOptimistic で楽観的更新
   - 「俺がやるぜ」ボタン
3. MentionList コンポーネント
4. FilterBar（ステータス別フィルター）
5. TanStack Query でポーリング（新規メンション自動取得）

### Phase 7: テスト・仕上げ
1. コンポーネントテスト
2. UseCase テスト
3. 統合テスト
4. UI調整

## 主要ファイル

### Domain層
- `src/domain/entities/Mention.ts` - メンションエンティティ
- `src/domain/value-objects/MentionStatus.ts` - 4つのステータス

### Infrastructure層
- `src/infrastructure/slack/SlackClient.ts` - Slack API呼び出し
- `src/infrastructure/repositories/MentionRepository.ts` - 状態永続化

### Presentation層
- `src/presentation/components/MentionCard/MentionCard.tsx` - メインUI
- `src/presentation/hooks/useOptimisticStatus.ts` - React 19活用

## データ構造

### Mention Entity
```typescript
interface Mention {
  id: string;
  slackMessageId: string;
  channelId: string;
  channelName: string;
  text: string;
  senderUserId: string;
  senderName: string;
  mentionType: 'channel' | 'here' | 'user';
  timestamp: string;
  status: MentionStatus;
  assigneeId?: string;      // 対応者ID
  assigneeName?: string;    // 対応者名
  completedAt?: string;
}

type MentionStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';
```

### json-server DB構造
```json
{
  "mentions": [
    {
      "id": "1",
      "slackMessageId": "1234567890.123456",
      "status": "pending",
      "assigneeId": null,
      "assigneeName": null
    }
  ],
  "users": [
    {
      "id": "U12345",
      "name": "田中太郎"
    }
  ]
}
```

## 検証方法

1. **Slack App設定確認**: Bot Tokenで `conversations.history` が動作するか
2. **開発サーバー起動**: `npm run dev`
3. **json-server起動**: `npx json-server --watch db.json --port 3001`
4. **テスト実行**: `npm run test`
5. **E2E確認**: メンション取得 → 「俺がやるぜ」→ 完了 のフロー

## インストールコマンド

```bash
# 状態管理・API
npm install zustand @tanstack/react-query axios

# スタイリング
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Lint/Format（Biome）
npm install -D --save-exact @biomejs/biome
npx @biomejs/biome init

# ESLint関連を削除
npm uninstall eslint eslint-plugin-react-hooks eslint-plugin-react-refresh @eslint/js typescript-eslint globals
rm eslint.config.js

# テスト
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event

# API
npm install -D json-server
```

## 学習ポイント一覧

| 学習目標 | 対応する実装 |
|---------|-------------|
| クリーンアーキテクチャ | 4層構造 + Gateway パターン |
| React 19 useOptimistic | 「俺がやるぜ」の楽観的更新 |
| React 19 useActionState | ステータス変更処理 |
| React 19 useTransition | フィルター切り替え |
| Zustand | UI状態管理 |
| TanStack Query | ポーリングで自動更新 |
| Vitest | ユニット・コンポーネントテスト |
| Biome | ESLint+Prettier代替の高速Linter |
| 外部API連携 | Slack Web API |

## Slack App 作成手順（参考）

1. https://api.slack.com/apps にアクセス
2. 「Create New App」→「From scratch」
3. App Name入力、ワークスペース選択
4. 「OAuth & Permissions」→ Bot Token Scopes追加
   - `channels:history`
   - `channels:read`
   - `users:read`
5. 「Install to Workspace」
6. Bot User OAuth Token（xoxb-...）をコピー
7. `.env.local` に設定

## Biome 設定例（biome.json）

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded"
    }
  }
}
```

### package.json scripts追加

```json
{
  "scripts": {
    "lint": "biome lint ./src",
    "format": "biome format --write ./src",
    "check": "biome check --write ./src"
  }
}
```

## 参考情報

- [Slack API 日本語ドキュメント](https://api.slack.com/lang/ja-jp)
- [Slack API でメッセージ取得](https://zenn.dev/kou_pg_0131/articles/slack-api-post-message)
- [Biome 公式ドキュメント](https://biomejs.dev/)
