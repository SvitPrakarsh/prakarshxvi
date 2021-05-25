import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            console.log("THIS PARSING ITEM OR NOT????")
            if (item) {
                if (typeof (JSON.parse(item)) == "string") {
                    console.log((JSON.parse(JSON.parse(item))))
                    return item ? JSON.parse(JSON.parse(item)) : initialValue;
                }
                else {
                    console.log((JSON.parse(item)))
                    return item ? JSON.parse(item) : initialValue;
                }
            }

        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}