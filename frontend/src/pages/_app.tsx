import type { AppProps } from 'next/app';
import Layouts from '../core/components/layouts';
import '../utils/assets/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { store } from '@/configs/store/store';
import { darkTheme, lightTheme } from '@/configs/themes';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }: AppProps) {
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
                <NextUIProvider>
                    <Layouts>
                        <Component {...pageProps} />
                    </Layouts>
                </NextUIProvider>
            </ThemeProvider>
        </Provider>
    );
}
