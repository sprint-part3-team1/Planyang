import React, {useEffect} from "react";

export const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: Function) => {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if(ref.current && !ref.current.contains(e.target as Node)) {
                callback?.();
            }
        }

        window.addEventListener('mousedown', handleClick);

        return () => window.removeEventListener('mousedown', handleClick)
    }, [ref, callback]);
}