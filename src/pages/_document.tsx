import Document, { Html, Head, Main, NextScript } from 'next/document'


export default class MyDocument extends Document {
    render() {
        const gaId = process.env.GOOGLE_ANALYTICS_ID || ''
        const url = `https://www.googletagmanager.com/gtag/js?gaId=${gaId}`

        const gaScript = (<>
            <script async src={url} />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        function gtagPageview(pagename){
                            gtag('config', '${gaId}', {'page_path': pagename});
                        }
                        function gtagEvent(action, category, label, value){
                            gtag('event', action, {
                                'event_category': category,
                                'event_label': label,
                                'value': value
                            });
                        }
                        gtag('js', new Date());
                        `,
                }}
            />
        </>)

        return (
            <Html lang="ja">
                <Head>
                    {gaId && (gaScript)}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}