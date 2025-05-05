import {useEffect, useState} from "react";

/**
 * Custom hook for displaying toast messages that automatically disappear after a specified duration.
 *
 * @param {number} [duration=3000] - Time in milliseconds before the toast disappears
 * @returns {Array} Returns an array containing the current message and a function to show a new toast
 * @returns {string} returns[0] - Current toast message
 * @returns {Function} returns[1] - Function to show a new toast message
 */
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