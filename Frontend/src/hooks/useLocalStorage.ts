import { useState, useEffect, type SetStateAction } from "react";


export function useLocalStorage<T>(key:string, initialValue:T){
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);

        return saved? JSON.parse(saved) : initialValue
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))

    }, [value, key])

    return [value, setValue] as [T, React.Dispatch<SetStateAction<T>>] 

}