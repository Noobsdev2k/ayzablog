import type { AppProps } from 'next/app';
import Layouts from '../core/components/layouts';
import '../utils/assets/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { store } from '@/configs/store/store';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <NextUIProvider>
                <Layouts>
                    <Component {...pageProps} />
                </Layouts>
            </NextUIProvider>{' '}
        </Provider>
    );
}
