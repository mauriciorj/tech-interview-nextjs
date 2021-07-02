import '../styles/globals.css';
import '../pages/RichTextEditor/react-draft-wysiwyg.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            {typeof window === 'undefined' ? null : (
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            )}
        </>
    );
}

export default MyApp;
