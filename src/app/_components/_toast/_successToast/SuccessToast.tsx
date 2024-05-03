import React, {useEffect, useRef, useState} from 'react'
import styles from './SuccessToast.module.css'
import {SuccessToastProps} from "@/app/_types/SuccessToastProps";

const SuccessToast = ({successMessage, successState, onClose}: SuccessToastProps) => {
    const [show, setShow] = useState(successState);
    let timer: NodeJS.Timeout;
    let lock = useRef(false);

    useEffect(() => {
        if(successState) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [successState]);

    useEffect(() => {
        if(show) {
            if(lock.current) return;
            lock.current = true;
            timer = setTimeout(() => {
                setShow(false);
                localStorage.removeItem('signupSuccess');
                onClose();
                lock.current = false;

            }, 3000);
        }
    }, [show, onClose]);

    if(!show) return null;

    return (
        successState && <div className={`${show ? styles.successToastWrapper : undefined}`}>{successMessage}</div>
    )
}

export default SuccessToast;