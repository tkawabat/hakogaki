## 準備
* 環境変数ファイルを作成

```
$ cp .env.sample .env
$ cp .env.sample .env.production
```

    * google consoleのAPIの認証情報から記載
    *  開発用（.env）ではGAの設定は削除する


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