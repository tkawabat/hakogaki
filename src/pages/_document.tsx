import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets as MaterialUIStyleSheets } from '@mui/styles'
import { ServerStyleSheet as StyledComponentsStyleSheets } from 'styled-components'

export default class MyDocument extends Document {
    render() {
        const gaId = process.env.GOOGLE_ANALYTICS_ID || ''
        const url = `https://www.googletagmanager.com/gtag/js?gaId=${gaId}`

        const gaScript = (
            <>
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
            </>
        )

        return (
            <Html lang="ja">
                <Head>{gaId && gaScript}</Head>
                <body style={{ margin: 0,  width: '100%' }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const materialUISheets = new MaterialUIStyleSheets()
    const styledComponentsSheets = new StyledComponentsStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) =>
                    styledComponentsSheets.collectStyles(
                        materialUISheets.collect(<App {...props} />)
                    ),
            })

        const initialProps = await Document.getInitialProps(ctx)

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {styledComponentsSheets.getStyleElement()}
                </>
            ),
        }
    } finally {
        styledComponentsSheets.seal()
    }
}
