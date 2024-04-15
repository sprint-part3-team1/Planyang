import React from 'react'
import styles from './NumberIcon.module.css'
import {NumberIconProps} from "@/app/_types/NumberIconProps";

const NumberIcon = ({count} : NumberIconProps) => {
    return(
        <div className={styles.iconWrapper}>{`+${count}`}</div>
    )
}

export default NumberIcon;