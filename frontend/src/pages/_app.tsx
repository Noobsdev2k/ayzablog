import type { AppProps } from 'next/app';
import Layouts from '../core/components/layouts';
import '../utils/assets/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider>
            <Layouts>
                <Component {...pageProps} />
            </Layouts>
        </NextUIProvider>
    );
}
