import React, {useEffect, useRef, useState} from 'react'
import styles from './UserIconList.module.css'
import {MemberListDto} from "@/app/_types/_dto/MemberListDto";
import UserIcon from "@/app/_components/UserIcon";
import NumberIcon from "@/app/_components/NumberIcon";

const UserIconList = ({members, totalCount} : MemberListDto) => {
    const DESKTOP_WIDTH = 1024;

    let calcWrapperWidth = (count: number) => {
        if(count <= 0) {
            return 0;
        } else if(count === 1) {
            return 38;
        } else {
            return 38 + 30 * (count - 1);
        }
    }

    let leftValue = (index: number) => 30 * (index);

    const [listStyle, setListStyle] = useState(window.innerWidth >= DESKTOP_WIDTH);
    const lastWidth = useRef(window.innerWidth);

    const setListType = (breakPoint: number, count: number) => {
        return new Array(Math.min(breakPoint, count)).fill(null).map((value, index) => {
            return index + 1 < breakPoint ?
                <div key={index} className={styles.iconWrapper} style={{left: leftValue(index)}}>
                    <UserIcon key={index} nickname={members[index].nickname} profileImageUrl={members[index].profileImageUrl}/>
                </div>
                 :
                count >= breakPoint ?
                    <div key={index} className={styles.iconWrapper} style={{left: leftValue(index)}}>
                        <NumberIcon key={index} count={count - breakPoint + 1}/>
                    </div>: null;
        })
    }

    useEffect(() => {
        const handleResize = () => {
            if(listStyle && (window.innerWidth < DESKTOP_WIDTH)) {
                setListStyle(false);
            } else if(!listStyle && (window.innerWidth >= DESKTOP_WIDTH)) {
                setListStyle(true);
            }
            lastWidth.current = window.innerWidth;
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [listStyle]);

    return (
        <div>
            {
                listStyle ?
                    <div className={styles.entireWrapper} style={{width: calcWrapperWidth(Math.min(totalCount, 5))}}>
                        {
                            setListType(5, totalCount)
                        }
                    </div> :
                    <div className={styles.entireWrapper} style={{width: calcWrapperWidth(Math.min(totalCount, 3))}}>
                        {
                            setListType(3, totalCount)
                        }
                    </div>
            }
        </div>
    )
}

export default UserIconList;