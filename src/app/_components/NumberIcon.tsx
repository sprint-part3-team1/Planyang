import React from 'react'
import styles from './NumberIcon.module.css'
import {NumberIconProps} from "@/app/_types/NumberIconProps";

const NumberIcon = ({count} : NumberIconProps) => {
    return(
        <div className={styles.iconWrapper}>{`+${Math.min(count, 99)}`}</div>
    )
}

export default NumberIcon;