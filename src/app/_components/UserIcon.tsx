import React from 'react'
import styles from './UserIcon.module.css'
import {UserIconProps} from "@/app/_types/UserIconProps";
import {createRandomColor} from "@/app/_utils/colorUtils";

const UserIcon = ({nickname, profileImageUrl} : UserIconProps) => {
    const customImage = () => {
        const backgroundColor = createRandomColor(nickname);

        if(profileImageUrl != null ) {
            return {
                backgroundImage: profileImageUrl,
            }
        }
        else return {
            backgroundColor: backgroundColor
        }
    }

    return (
        <div className={styles.iconWrapper} style={customImage()}>
            {
                profileImageUrl == null ? nickname.at(0) : null
            }
        </div>
    )
}

export default UserIcon;