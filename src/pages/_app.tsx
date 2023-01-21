import '../style/global.css'
import { AppProps } from 'next/app'
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { StylesProvider } from '@mui/styles'
import Script from 'next/script'
import GoogleDriveApiDao from 'src/dao/GoogleDriveApiDao'

export default function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
    let load = 2;
    return (
        <>
            <Script src="https://apis.google.com/js/api.js" onLoad={() => {
                if (--load <= 0) GoogleDriveApiDao.init();
            }}></Script>
            <Script src="https://accounts.google.com/gsi/client" onLoad={() => {
                if (--load <= 0) GoogleDriveApiDao.init();
            }} ></Script>
                <SessionProvider session={pageProps.session}>

            <StylesProvider injectFirst>
                <Component {...pageProps} />
            </StylesProvider>

            </SessionProvider>

        </>
    )
}
