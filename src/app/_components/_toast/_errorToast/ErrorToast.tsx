import React, {useEffect, useRef, useState} from 'react'
import styles from './ErrorToast.module.css'
import {ErrorToastProps} from "@/app/_types/ErrorToastProps";

const ErrorToast = ({errorMessage, errorState, onClose}: ErrorToastProps) => {
    const [show, setShow] = useState(errorState);
    let timer: NodeJS.Timeout;
    let lock = useRef(false);

    useEffect(() => {
        if(errorState) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [errorState]);

    useEffect(() => {
        if(show) {
            if(lock.current) return;
            lock.current = true;
            timer = setTimeout(() => {
                setShow(false);
                onClose();
                lock.current = false;

            }, 3000);
        }
    }, [show, onClose]);

    if(!show) return null;

    return (
        errorState && <div className={`${show ? styles.errorToastWrapper : undefined}`}>{errorMessage}</div>
    )
}

export default ErrorToast;