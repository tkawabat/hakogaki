import '../style/global.css'
import { AppProps } from 'next/app'
import { StylesProvider } from '@mui/styles'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <StylesProvider injectFirst>
            <Component {...pageProps} />
        </StylesProvider>
    )
}
