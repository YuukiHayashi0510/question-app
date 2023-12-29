This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 環境構築

### ライブラリのインストール

```zsh
yarn
```

### Seed の入れ方

#### コマンド

```bash
# 権限の付与
chmod +x ./script/seed.sh

# 実行
./script/seed.sh
```

#### 手動

1. `seed`ディレクトリにある最新のものをプロジェクトディレクトリ直下にコピーします
2. コピーしたディレクトリ名を`data`に変更する

この手順で Seed が入ります！

あとは、Development 環境で編集等した場合は`data`ディレクトリの中で

書き込み・読み取りが行われるので、気にしなくて大丈夫です！

data フォルダは`.gitignore`に記載してあるので、Github にアップロードされることはありません。

## 開発方法

### develop 環境(基本これ)

1. エミュレータの起動
2. サーバーの起動

development でサーバー起動、エミュレータのデータを取得・接続
初回のみ or Seed を入れ直したい時のみ、Seed の作業を行い、初期アカウントの追加を行う

```zsh
yarn emulate
yarn dev
```

エミュレータの URL：http://127.0.0.1:4000/ or http://localhost:4000

### production 環境(本番環境でテストしたい時)

production でサーバー起動、本番環境のデータ取得・接続

```zsh
yarn start
```

## Deploy on Firebase hosting

### Web アプリのみ

```zsh
yarn deploy:host
```

### セキュリティルール、インデックスの更新まで取り組んだ場合

```zsh
yarn deploy
```

## 新規で日報の Seed を入れたい場合

### 準備

1. `next.config.js`の`reactStrictMode`を `false` に設定
2. `firestore.rules`の`report`で`allow read, write: if true`に変更
3. `components/top/Layout.tsx`の中に以下の useEffect を配置

```tsx
useEffect(() => {
  const f = async () => {
    insertFakeReport()
  }
  f()
}, [])
```

### 実行

`src/utils/Faker/index.ts`の関数を 1 度だけ、TOP ページなどで実行することで Seed 作成できます。

Seed 挿入後、`data`フォルダを`seed`に移し、フォルダ名を最新の日付にしてください。

## Design

- [Material Design](https://mui.com/material-ui/)
- [react-chart.js](https://react-chartjs-2.js.org/examples)
- [hook-form x MUI](https://qiita.com/TK-C/items/af608d59366e63030f56)
