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

## Phase 8: 統計ダッシュボード（useMemo / useCallback / React.memo）

### 学習の目的

Phase 6で学んだ`useOptimistic`・`useTransition`に続き、Reactパフォーマンス最適化の3つの柱を学びます：

| フック | 役割 | いつ使うか |
|--------|------|-----------|
| `useMemo` | 計算結果のメモ化 | 高コストな派生データ計算が毎レンダリングで走るのを防ぎたい時 |
| `useCallback` | 関数参照の安定化 | 子コンポーネントにpropsで関数を渡す時 |
| `React.memo` | コンポーネントの再レンダリング防止 | propsが変わっていないのに再レンダリングされるのを防ぎたい時 |

**重要**: `useCallback` + `React.memo` はセットで意味を持ちます。片方だけでは効果がありません。

### 学習の流れ

```
カスタムフック入門 (Task 8-2)
  → useMemo で計算メモ化 (Task 8-3, 8-4)
    → useCallback でハンドラ安定化 (Task 8-5)
      → React.memo で再レンダリング防止 (Task 8-6)
        → 全体統合 (Task 8-7)
```

### Task 8-1: モックデータ拡充

`db.json` を2件から15〜20件に拡充してください。統計計算が意味のあるものになるよう、以下を満たすデータを用意します：

- 4つのステータスがすべて含まれる（pending: 4件程度、in_progress: 4件程度、completed: 5件程度、skipped: 3件程度）
- 複数の担当者（4人以上: 田中、鈴木、佐藤、山田など）
- `createdAt` と `updatedAt` に差がある（対応時間の計算に使う）
- `updatedAt` が `createdAt` より数時間〜数日後のデータを含める

**ヒント**: completedのデータは `updatedAt - createdAt` の差がバラつくようにすると、平均対応時間の計算が面白くなります。

### Task 8-2: `useDebouncedValue` カスタムフック作成

`src/presentation/hooks/useDebouncedValue.ts` を作成してください。

**仕様**:
- ジェネリクス `<T>` で任意の型に対応
- 引数: `value: T`, `delay: number`（ミリ秒）
- 戻り値: デバウンスされた値 `T`
- `useState` + `useEffect` + `setTimeout` で実装
- cleanup関数でタイマーをクリア（メモリリーク防止）

**テスト**: `src/presentation/hooks/useDebouncedValue.spec.ts` も作成。
`@testing-library/react` の `renderHook` と `vi.useFakeTimers()` を使ってテストしてください。

**学習ポイント**: これがもっともシンプルなカスタムフックです。`useState` と `useEffect` を組み合わせて再利用可能なロジックを抽出するパターンを身につけましょう。

### Task 8-3: `useMentionStats` カスタムフック作成

`src/presentation/hooks/useMentionStats.ts` を作成してください。

**仕様**:
- 引数: `mentions: Mention[]`（Zustandストアに依存しない設計）
- 戻り値の型:
  ```typescript
  type MentionStats = {
    statusCounts: Record<string, number>;  // ステータス別件数
    responseRate: number;                   // 完了率（%）
    averageResponseTime: number;            // 平均対応時間（ミリ秒）
    leaderboard: Array<{ name: string; count: number }>;  // 対応者ランキング
    totalCount: number;                     // 合計件数
  };
  ```
- 各統計値を **個別の `useMemo`** で計算する

**テスト**: `src/presentation/hooks/useMentionStats.spec.ts` も作成。

**学習ポイント**:
- なぜ `useMemo` が必要か → `console.log('[useMemo] statusCounts を再計算中...')` を各useMemoの中に入れて、再計算タイミングを確認してください
- `mentions` が変わらない限り、フィルターボタンを押しても統計は再計算されないことを体感しましょう
- 引数で `mentions` を受け取る設計にすることで、Zustandに依存せずテストしやすくなります

**ヒント**:
- 完了率: `(completedの件数 / 全件数) * 100`
- 平均対応時間: statusが`completed`または`in_progress`で`updatedAt > createdAt`のメンションについて、`new Date(updatedAt).getTime() - new Date(createdAt).getTime()`の平均
- リーダーボード: `assignee` があるメンションを `assignee.name` でグループ化し、件数で降順ソート

### Task 8-4: `StatisticsPanel` コンポーネント作成

`src/presentation/components/StatisticsPanel.tsx` を作成してください。

**仕様**:
- propsで`mentions: Mention[]`を受け取る
- `useMentionStats` フックを使って統計を計算
- Tailwind CSSで4カードのグリッドレイアウト（`grid grid-cols-2 gap-4`）
- 表示する4つのカード:
  1. **ステータス分布**: 各ステータスの件数をリスト表示
  2. **完了率**: パーセンテージを大きく表示
  3. **平均対応時間**:「X時間Y分」形式で表示
  4. **対応者ランキング**: 順位付きリスト

**テスト**: `src/presentation/components/StatisticsPanel.spec.tsx` も作成。

**ヒント**: ミリ秒を「X時間Y分」に変換するヘルパー関数をコンポーネント内に作ると良いでしょう。

### Task 8-5: Zustandストア拡張 + `useFilteredMentions` フック + `SearchSortBar` コンポーネント

このTaskは3つのパーツがあります。

#### 8-5a: Zustandストア拡張

`src/presentation/stores/mentionStore.ts` に以下を追加してください：

```typescript
// 新しい型（別ファイルで定義してもOK）
type SortKey = 'createdAt' | 'status' | 'assignee';
type SortOrder = 'asc' | 'desc';

// StateOfMention に追加するフィールド
searchQuery: string;       // 初期値: ''
sortKey: SortKey;           // 初期値: 'createdAt'
sortOrder: SortOrder;       // 初期値: 'desc'

// 追加するアクション
setSearchQuery: (query: string) => void;
setSortKey: (key: SortKey) => void;
setSortOrder: (order: SortOrder) => void;
```

#### 8-5b: `useFilteredMentions` カスタムフック

`src/presentation/hooks/useFilteredMentions.ts` を作成してください。

**仕様**:
- 引数: `mentions`, `filter`, `searchQuery`, `sortKey`, `sortOrder`, および各setter関数
- `useMemo` でフィルター + テキスト検索 + ソートを一括適用した `filteredMentions` を返す
- `useCallback` で `handleSearchChange`, `handleSortKeyChange`, `handleSortOrderToggle` をメモ化して返す

**学習ポイント**:
- `useCallback`が必要な理由 → これらのハンドラーを`SearchSortBar`にpropsで渡します。`useCallback`を使わないと、毎レンダリングで新しい関数が作られ、`React.memo`で包んだ子コンポーネントが毎回再レンダリングされてしまいます
- `useMemo` でフィルター結果をメモ化 → 検索やソートの条件が変わらない限り、同じ配列参照が返される

**テスト**: `src/presentation/hooks/useFilteredMentions.spec.ts` も作成。

#### 8-5c: `SearchSortBar` コンポーネント

`src/presentation/components/SearchSortBar.tsx` を作成してください。

**仕様**:
- propsでハンドラー関数とソート状態を受け取る
- テキスト入力欄（`useDebouncedValue` で300msデバウンス）
- ソートキー選択（select: 日付 / ステータス / 担当者）
- ソート順トグルボタン（↑昇順 / ↓降順）
- `console.log('[Render] SearchSortBar がレンダリングされました')` をコンポーネントの先頭に追加

### Task 8-6: React.memo の適用

以下のコンポーネントを `React.memo` で包んでください：

1. **SearchSortBar** → `memo(function SearchSortBar(...) { ... })`
2. **MentionCard** → `memo(function MentionCard(...) { ... })`
3. **MentionList** → `memo(function MentionList(...) { ... })`

**同時に MentionList をリファクターしてください**：
- **Before**: 内部で `useMentions` から `filter` と `mentions` を取得してフィルタリング
- **After**: propsで `filteredMentions: Mention[]` を受け取るだけ（フィルター・検索・ソートは `useFilteredMentions` に一元化）

各コンポーネントの先頭に `console.log` を入れて、どのコンポーネントがいつ再レンダリングされるかを確認してください。

**学習ポイント**:
- `React.memo` は「propsが変わっていなければ再レンダリングしない」を実現する
- ただし、内部で `useMentions()` のようなフックを呼ぶと、ストアの更新でフックが再レンダリングをトリガーするので `React.memo` は効かない
- propsで受け取る設計にすると `React.memo` が有効になる → これが `MentionList` をリファクターする理由

### Task 8-7: DashboardPage 統合

`src/presentation/pages/DashboardPage.tsx` を修正し、すべてを統合してください。

**目指す構造**:
```
DashboardPage（オーケストレーター）
├── Zustandストアからデータ + setter を取得
├── useFilteredMentions() でメモ化済みデータ + コールバックを取得
├── <StatisticsPanel mentions={mentions} />
├── <FilterBar />                            ← 既存（変更なし）
├── <SearchSortBar onSearchChange={...} />   ← 新規
└── <MentionList filteredMentions={...} />   ← props駆動に変更
```

**学習ポイント**: DashboardPageは「データの流れを管理するオーケストレーター」です。フックからメモ化されたデータとコールバックを取得し、子コンポーネントに渡すことで、各コンポーネントが「自分に関係ある変更」だけで再レンダリングされる構造を作ります。

### Task 8-8: テスト・動作確認

1. **既存テストの更新**: `MentionList.spec.tsx`を新しいprops駆動のインターフェイスに合わせて修正
2. **全テスト実行**: `npm run test:run` で全テストがパスすることを確認
3. **動作確認**:
   ```bash
   # ターミナル1
   npm run dev
   # ターミナル2
   npx json-server --watch db.json --port 3001
   ```
4. **DevToolsでメモ化を確認**: ブラウザの開発者ツールのコンソールで以下を確認
   - フィルターボタンを押した時 → `[useMemo] filteredMentions を再計算中...` は出るが `[useMemo] statusCounts を再計算中...` は出ない
   - 検索テキストを入力した時 → `[React.memo] SearchSortBar がレンダリングされました` はデバウンス後のみ
   - `MentionCard` の `console.log` → propsが変わったカードだけが再レンダリングされる
5. **lint**: `npm run check` でエラーがないことを確認

**完了したら「Phase 8完了、レビューして」と言ってください。**

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
