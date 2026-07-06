## このプロジェクトは何か？

RAYVEN の [Tumiki MCP Manager](https://www.tumiki.cloud/) のデモを実際に使い、
理解するために作った検証用プロジェクトです。

シンプルな Todo アプリを題材に、以下を実際に体験しました。

- Tumiki 経由で Claude Code と Supabase の MCP サーバーを接続し、
  AI（Claude Code）による DB の構築・操作を行う
- その過程で、MCP を一元管理し、権限と AI の操作を記録・制御する
  Tumiki の価値を、ユーザーとして体験する

## 何をやったのか？

1. **検証用の Supabase プロジェクトを用意**
   使い捨ての検証用環境を作成した

2. **Tumiki に Supabase MCP サーバーを接続**
   OAuth 連携で登録。この際、AI に渡す権限(Database の READ + WRITE など)を認可画面で確認

3. **Claude Code を Tumiki 経由で接続**
   Tumiki が発行するエンドポイントを Claude Code の MCP 設定に登録。
   Supabase への接続情報は Tumiki 側が保持し、Claude Code は Tumiki を通して Supabase を操作する構成になっている。複数の MCP サーバーを Tumiki で一元管理できる点が便利。

4. **AI に DB を構築させる**
   Claude Code に指示し、Tumiki 経由で Supabase に todos テーブルを作成とデータ挿入

5. **操作が監査ログに記録されるのを確認**
   テーブル作成・データ挿入・テーブル確認の全操作が、実行時間・データサイズ・トークン数とともに Tumiki に記録された

6. **アプリのデータ層を本物の DB に移行**
   ダミーデータで作っていた Todo アプリを、Supabase に接続

## Tumiki を使って感じたこと

## 詰まった点

## 使用技術

| 技術            |                    |
| --------------- | ------------------ |
| 言語            | TypeScript         |
| フレームワーク  | Next.js 15         |
| UI ライブラリ   | React 19           |
| スタイリング    | Tailwind CSS       |
| DB              | Supabase           |
| MCP 管理基盤    | Tumiki MCP Manager |
| AI コーディング | Claude Code        |
