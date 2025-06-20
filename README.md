# TODO管理アプリケーション

Next.js（フロントエンド）とHono（バックエンドAPI）を使用したTODO管理アプリケーションです。SQLiteを使用してデータを永続化し、Tailwind CSSでスタイリングを行っています。

## 📋 機能

- ✅ TODOの作成、編集、削除
- 🔄 TODOの完了・未完了の切り替え
- 💾 SQLiteを使用したデータ永続化
- 🎨 Tailwind CSSによるモダンなUI
- 🔌 REST APIによるフロントエンド・バックエンド分離

## 🏗️ アーキテクチャ

- **フロントエンド**: Next.js 15 + TypeScript + Tailwind CSS
- **バックエンド**: Hono サーバー（ポート3001）
- **データベース**: SQLite + better-sqlite3
- **コンポーネント**: Reactコンポーネント + クライアントサイド状態管理

## 📁 主要ファイル

- `lib/db.ts` - データベース接続とTODO操作
- `lib/hono-app.ts` - Hono APIルート（CRUD操作）
- `server.ts` - Honoサーバーエントリーポイント
- `src/lib/api.ts` - フロントエンドAPIクライアント
- `src/components/TodoList.tsx` - メインTODOリストコンポーネント
- `src/components/TodoItem.tsx` - 個別TODOアイテムコンポーネント
- `src/components/TodoForm.tsx` - TODO作成フォーム

## 🚀 セットアップ手順

### 前提条件

- Node.js 18.0以上
- npm、yarn、pnpm、またはbunのいずれか

### インストール

1. リポジトリをクローン:
```bash
git clone https://github.com/takyshu98/claude-code-todo.git
cd claude-code-todo
```

2. 依存関係をインストール:
```bash
npm install
```

## 🏃‍♂️ アプリケーションの起動

### 開発環境

**重要**: 2つのサーバーを同時に起動する必要があります。

1. **Hono APIサーバーを起動**（ポート3001）:
```bash
npm run dev:server
```

2. **別のターミナルで Next.js フロントエンドを起動**（ポート3000）:
```bash
npm run dev
```

3. ブラウザで `http://localhost:3000` にアクセス

### 本番環境

```bash
# アプリケーションをビルド
npm run build

# 本番サーバーを起動
npm start
```

## 📖 基本的な使用方法

### TODOの作成
1. アプリケーション上部のテキストフィールドにTODOタイトルを入力
2. 「Add Todo」ボタンをクリック、またはEnterキーを押す

### TODOの編集・更新
1. 編集したいTODOアイテムをクリック
2. インライン編集でテキストを変更
3. Enterキーまたは他の場所をクリックして保存

### TODOの完了・未完了切り替え
- TODOアイテム左側のチェックボックスをクリック

### TODOの削除
- TODOアイテムの削除ボタン（✕）をクリック

## 🔌 API仕様

### エンドポイント一覧

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| GET | `/api/todos` | 全てのTODOを取得 |
| POST | `/api/todos` | 新しいTODOを作成 |
| GET | `/api/todos/:id` | 指定IDのTODOを取得 |
| PUT | `/api/todos/:id` | 指定IDのTODOを更新 |
| DELETE | `/api/todos/:id` | 指定IDのTODOを削除 |

### リクエスト・レスポンス例

#### TODO作成
```bash
# リクエスト
POST /api/todos
Content-Type: application/json

{
  "title": "新しいタスク"
}

# レスポンス
{
  "id": 1,
  "title": "新しいタスク",
  "completed": false,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

#### TODO更新
```bash
# リクエスト
PUT /api/todos/1
Content-Type: application/json

{
  "title": "更新されたタスク",
  "completed": true
}
```

## 📊 データベーススキーマ

```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🛠️ 開発コマンド

```bash
# 依存関係のインストール
npm install

# Next.js開発サーバー起動（ポート3000）
npm run dev

# Hono APIサーバー起動（ポート3001）
npm run dev:server

# 本番用ビルド
npm run build

# 本番サーバー起動
npm start

# リンティング実行
npm run lint
```

## 🔧 トラブルシューティング

### よくある問題と解決方法

#### 1. "Connection refused" エラー
**症状**: フロントエンドからAPIにアクセスできない

**解決方法**:
- Hono APIサーバー（`npm run dev:server`）が起動していることを確認
- ポート3001が他のプロセスで使用されていないか確認:
  ```bash
  lsof -i :3001
  ```

#### 2. データベースファイルの権限エラー
**症状**: SQLiteデータベースへの書き込みに失敗

**解決方法**:
- プロジェクトディレクトリの書き込み権限を確認
- `todos.db`ファイルを削除して再起動（データは失われます）

#### 3. ポートの競合
**症状**: "Port 3000 is already in use" エラー

**解決方法**:
- 使用中のプロセスを終了するか、別のポートを使用:
  ```bash
  PORT=3001 npm run dev
  ```

#### 4. Node.js バージョンの問題
**症状**: 依存関係のインストールやビルドに失敗

**解決方法**:
- Node.js 18.0以上であることを確認:
  ```bash
  node --version
  ```

### ログの確認方法

- **フロントエンド**: ブラウザの開発者ツールコンソール
- **バックエンド**: APIサーバーを起動したターミナル
- **データベース**: `todos.db`ファイルをSQLiteツールで直接確認

### データベースの問題への対処

```bash
# データベースファイルの確認
ls -la todos.db*

# データベースの内容確認（sqlite3がインストールされている場合）
sqlite3 todos.db "SELECT * FROM todos;"

# データベースのリセット（注意: 全データが削除されます）
rm todos.db*
npm run dev:server  # 新しいデータベースが自動作成されます
```

## 📝 開発メモ

- データベースファイル（`todos.db`）はサーバー起動時に自動作成されます
- フロントエンドは `http://localhost:3001` でバックエンドと通信します
- 全コンポーネントはTypeScriptで型安全性を確保しています
- アプリはCRUD操作（作成、読み取り、更新、削除）をサポートしています

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m 'Add some amazing feature'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. プルリクエストを作成
