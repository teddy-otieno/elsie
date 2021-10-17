import type { AppProps } from 'next/app';
import "../components/styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
export default MyApp
