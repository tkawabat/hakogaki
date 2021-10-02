import Head from 'next/head'
import * as C from '../../lib/Const'

interface Props {}

const App = (props: Props) => {
    const title = 'HAKOGAKI(β) 小説・脚本の箱書き支援アプリ'
    const description =
        'HAKOGAKIは箱書きを支援するアプリです。' +
        '小説・脚本・論文などで、プロットと本文を同時に編集することができ、' +
        '構成を練りながら物語を創作できます。' +
        '進捗やTodoの管理機能も搭載。'
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
            <meta property="og:image" content={url + 'hakogaki_ogimage.png'} />
            <meta property="og:site_name" content={title} />
            <meta property="og:locale" content="ja_JP" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@MatchingRandom" />
        </Head>
    )
}

export default App
