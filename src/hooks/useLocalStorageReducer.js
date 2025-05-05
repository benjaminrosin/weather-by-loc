import {useEffect, useReducer} from 'react';

function useLocalStorageReducer(key, reducer ,initialValue) {
    const initializer = (initialValue) => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch (err) {
            console.error('Error loading from localStorage:', err);
            return initialValue;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialValue ,initializer);

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (err) {
            console.error('Error writing to localStorage key:', key, err);
        }
    }, [key, state]);

    return [state, dispatch];
}

export default useLocalStorageReducer;
