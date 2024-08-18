import { PullToRefresh } from "@vkontakte/vkui";
import { useState } from "react";

const RefreshComponent = ({ children, onRefreshCallback }: { children: JSX.Element, onRefreshCallback: () => Promise<void> }) => {
    const [fetching, setFetching] = useState(false);

    const onRefresh = async () => {
        setFetching(true);
        try {
            await onRefreshCallback();
        } finally {
            setFetching(false);
        }
    };

    return (
        <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
            {children}
        </PullToRefresh>
    );
};

export default RefreshComponent;
