import '../styles/globals.css';
import '../pages/RichTextEditor/react-draft-wysiwyg.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../styles/theme';
import Head from 'next/head';
import { translations } from '../translations';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const {
        en: { title, description, keywords, og_site_name, og_locale, og_type }
    } = translations;

    return (
        <>
            {typeof window === 'undefined' ? null : (
                <ThemeProvider theme={theme}>
                    <Head>
                        <title>{title}</title>
                        <meta name="description" content={description} />
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                        <meta name="keywords" content={keywords} />
                        <meta property="og:site_name" content={og_site_name} />
                        <meta property="og:locale" content={og_locale} />
                        <meta property="og:type" content={og_type} />
                        <link rel="manifest" href="/manifest.json" />
                        <link rel="icon" href="/favicon.ico" />
                        <link rel="apple-touch-icon" href="/logo-96x96.png" />
                        <meta name="apple-mobile-web-app-status-bar" content="#FFF" />
                        <meta name="theme-color" content="#0063c9" />
                        <link rel="icon" href="/favicon.ico" />
                        <link rel="preload" href="../assets/img/interview.webp" />
                    </Head>
                    <Component {...pageProps} />
                </ThemeProvider>
            )}
        </>
    );
}

export default MyApp;
