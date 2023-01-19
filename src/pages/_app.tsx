import '../style/global.css'
import { AppProps } from 'next/app'
import { StylesProvider } from '@mui/styles'
import Script from 'next/script'
import GoogleDriveApiDao from 'src/dao/GoogleDriveApiDao'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Script
                src="https://apis.google.com/js/api.js"
                onLoad={() => {
                    GoogleDriveApiDao.init();
            }}></Script>
            <StylesProvider injectFirst>
                <Component {...pageProps} />
            </StylesProvider>
        </>
    )
}
