## 準備
* 開発
    * .env.sample ファイルから .envファイルを作成
    * GOOGLE_CLIENT_SECRETを記載

* demo/本番
    * Vercel上に環境変数を設定
        * NEXTAUTH_URL
            * 不要っぽい？
        * NEXT_PUBLIC_VERCEL_URL
        * GOOGLE_CLIENT_SECRET
        * NEXT_PUBLIC_SECRET
            * "openssl rand -base64 32"コマンドで生成


## 開発
* 起動

```
$ npm run dev
```

## Preview
1. demoブランチにPush
    * demoブランチはいつ消してもいいようにする
    * demoドメインを[Google Cloud Platformの認証情報](https://console.cloud.google.com/apis/credentials?hl=ja&project=hakogaki)のOAuthクライアントIDの"本番"に追加
1. [Vercel](https://vercel.com/tkawabat/hakogaki) でPreview Deployを確認
1. 以下のドメインで確認
    * https://hakogaki-git-demo-tkawabat.vercel.app
    * Googleのcallbackがあるので他では見ない

## 本番
1. mainブランチにPush