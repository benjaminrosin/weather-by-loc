import {useEffect, useState} from "react";

function useToast(duration = 3000) {
    const [message, setMessage] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    const showToast = (newMessage) => {
        setMessage(newMessage);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const id = setTimeout(() => setMessage(''), duration);
        setTimeoutId(id);
    };

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        }
    }, [timeoutId]);
    return [message, showToast];
}
export default useToast;