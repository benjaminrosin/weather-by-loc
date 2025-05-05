import {useEffect, useReducer} from 'react';

/**
 * Custom React hook that combines useReducer with localStorage persistence.
 *
 * Initializes state from localStorage (if available) and persists updates automatically.
 *
 * @param {string} key - The localStorage key used to store and retrieve the state.
 * @param {function} reducer - A reducer function that defines how the state is updated.
 * @param {Object} initialValue - The initial state value if nothing is stored in localStorage.
 * @returns {[any, function]} An array containing the current state and the dispatch function.
 */
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
