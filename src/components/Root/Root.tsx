'use client';

import { useEffect, type PropsWithChildren } from 'react';

import {
    AdaptivityProvider,
    ConfigProvider,
    AppRoot,
    SplitLayout,
    SplitCol,
    PanelHeader
} from '@vkontakte/vkui';

import StoreProvider from '@/components/StoreProvider';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { i18nStrings } from "@/i18n";

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';

import { useDidMount } from '@/hooks/useDidMount';

import '@vkontakte/vkui/dist/vkui.css';
import 'normalize.css/normalize.css';
import "@/app/globals.css";

const i18nHook = i18n.use(initReactI18next);

i18nHook.init({
    resources: i18nStrings,

    interpolation: {
        escapeValue: false
    }
});

function App(props: PropsWithChildren) {
    useEffect(() => {
        i18nHook.changeLanguage(navigator.language.split("-")[0])
    }, [navigator]);

    return (
        <ConfigProvider platform="ios">
            <AdaptivityProvider>
                <AppRoot>
                    <div className="select-none">
                        <SplitLayout header={<PanelHeader delimiter="none" className="hidden md:inline-block" />}>
                            <SplitCol autoSpaced>
                                {props.children}
                            </SplitCol>
                        </SplitLayout>
                    </div>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

function RootInner({ children }: PropsWithChildren) {
    return (
        <StoreProvider>
            <App>
                {children}
            </App>
        </StoreProvider>
    );
}

export function Root(props: PropsWithChildren) {
    const didMount = useDidMount();

    return didMount ? (
        <ErrorBoundary fallback={ErrorPage}>
            <RootInner {...props} />
        </ErrorBoundary>
    ) : null;
}
