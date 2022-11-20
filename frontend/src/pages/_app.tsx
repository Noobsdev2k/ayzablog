import type { AppProps } from 'next/app';

import '../utils/assets/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';

import { store } from '@/configs/store/store';
import { darkTheme, lightTheme } from '@/configs/themes';
import { ThemeProvider } from 'next-themes';
import { Page } from '@/core/interfaces/page';

type Props = AppProps & {
    Component: Page;
};

export default function App({ Component, pageProps }: Props) {
    const getLayout = Component.getLayout || ((page) => page);
    return (
        <Provider store={store}>
            <ThemeProvider
                defaultTheme="system"
                attribute="class"
                value={{
                    light: lightTheme.className,
                    dark: darkTheme.className,
                }}
            >
                <NextUIProvider>{getLayout(<Component {...pageProps} />)}</NextUIProvider>
            </ThemeProvider>
        </Provider>
    );
}
