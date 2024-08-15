import React, { useRef, useEffect, useCallback } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

type InvisibleTurnstileProps = {
    siteKey: string;
    onToken: (token: string | null) => void;
};

const InvisibleTurnstile: React.FC<InvisibleTurnstileProps> = ({ siteKey, onToken }) => {
    const ref = useRef<TurnstileInstance>(null);

    const handleToken = useCallback(() => {
        const token = ref.current?.getResponse() || null;
        onToken(token);
    }, [onToken]);

    useEffect(() => {
        handleToken();
    }, [handleToken]);

    return (
        <Turnstile
            ref={ref}
            siteKey={siteKey}
            options={{
                retry: "never",
                size: "invisible",
                execution: "render",
                refreshExpired: "never"
            }}
            onSuccess={(token: string) => onToken(token)}
        />
    );
};

export default InvisibleTurnstile;
