import { useEffect, useRef, useState } from 'react';
export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value]);
    return debouncedValue;
};
export const useDebouncedCallback = (callback, wait = 100) => {
    // track args & timeout handle between calls
    const argsRef = useRef(null);
    const timeout = useRef(null);
    function cleanup() {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
    }
    // make sure our timeout gets cleared if
    // our consuming component gets unmounted
    useEffect(() => cleanup, []);
    return function debouncedCallback(...args) {
        // capture latest args
        argsRef.current = args;
        // clear debounce timer
        cleanup();
        // start waiting again
        timeout.current = setTimeout(() => {
            if (argsRef.current) {
                callback(...argsRef.current);
            }
        }, wait);
    };
};
//# sourceMappingURL=useDebounce.js.map
