import Head from 'next/head'
import * as C from '../../lib/Const'

interface Props {}

const App = (props: Props) => {
    const title = 'HAKOGAKI(β) 小説・脚本の箱書き支援アプリ'
    const description =
        'HAKOGAKIは小説・脚本などの創作支援アプリです。' +
        'プロットと本文を同時に編集でき、創作を加速させます。' +
        'Todoや今日の進捗のお知らせ機能も搭載。'
    const url = 'https://hakogaki.vercel.app/'

    return (
        <Head>
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/logo192.png" />
            <link rel="manifest" href="/manifest.json" />

            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={url + 'hakogaki_ogimage.png?1'} />
            <meta property="og:site_name" content={title} />
            <meta property="og:locale" content="ja_JP" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@MatchingRandom" />

            <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>
    )
}

export default App
