import React, { useRef, useEffect } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

type InvisibleTurnstileProps = {
    siteKey: string;
    onToken: (token: string | null) => void;
};

const InvisibleTurnstile: React.FC<InvisibleTurnstileProps> = ({ siteKey, onToken }) => {
    const ref = useRef<TurnstileInstance>(null);

    const handleToken = () => {
        const token = ref.current?.getResponse() || null;
        onToken(token);
    };

    useEffect(() => {
        handleToken();
    }, []);

    return (
        <Turnstile
            ref={ref}
            siteKey={siteKey}
            options={{
                size: "invisible"
            }}
            onSuccess={(token: string) => onToken(token)}
        />
    );
};

export default InvisibleTurnstile;
