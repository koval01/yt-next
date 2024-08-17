import React, { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

type InvisibleTurnstileProps = {
    siteKey: string;
    onToken: (token: string | null) => void;
};

const InvisibleTurnstile = forwardRef<{
    reset: () => void;
}, InvisibleTurnstileProps>(({ siteKey, onToken }, ref) => {
    const turnstileRef = useRef<TurnstileInstance>(null);

    const handleToken = useCallback(() => {
        const token = turnstileRef.current?.getResponse() || null;
        onToken(token);
    }, [onToken]);

    useEffect(() => {
        handleToken();
    }, [handleToken]);

    // Expose the reset method to the parent component via the ref
    useImperativeHandle(ref, () => ({
        reset: () => {
            turnstileRef.current?.reset();
        },
    }));

    return (
        <Turnstile
            ref={turnstileRef}
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
});

export default InvisibleTurnstile;
