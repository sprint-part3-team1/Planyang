'use client'

import React from 'react'
import styles from '../DashboardTypeNavBar.module.css'
import Contour from "@/app/_components/Contour";
import UserIcon from "@/app/_components/UserIcon";
import {DashboardListNavBarProps} from "@/app/_types/DashboardListNavBarProps";
import ImageTextButton from "@/app/_components/Button/ImageTextButton";

const DashboardListNavBar = ({nickname, profileImageUrl}: DashboardListNavBarProps) => {
    const onClickButton = () => {
        console.log(' ');
    }

    return (
        <div className={styles.navbarWrapper}>
            <div className={styles.navBarTitleWrapper}>내 대시보드</div>
            <div className={styles.sideMenuWrapper}>
                <div className={styles.sideMenuButtonWrapper}>
                    <ImageTextButton text='관리' imageUrl='/assets/icons/gear.svg' onClickEvent={onClickButton}/>
                    <ImageTextButton text='초대하기' imageUrl='/assets/icons/invite.svg' onClickEvent={onClickButton}/>
                </div>
                <Contour />
                <div className={styles.sideMenuUserWrapper}>
                    <UserIcon nickname={nickname} profileImageUrl={profileImageUrl} />
                    <div className={styles.usernameWrapper}>{nickname}</div>
                </div>
            </div>
        </div>
    )
}

export default DashboardListNavBar;