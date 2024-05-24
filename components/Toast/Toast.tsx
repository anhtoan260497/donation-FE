
"use client";

import { Toast } from "flowbite-react";
import styles from './Toast.module.scss';
import { HiCheck, HiExclamation } from "react-icons/hi";
import Loader from "../Loader/Loader";
import clsx from "clsx";

interface ToastType {
    type: 'success' | 'error' | 'loading'
}

export function ToastComponent({ description, width, height, type, isActive }: {description: string, width: string, height: string, type: ToastType, isActive : boolean }) {

    const renderIcon = () => {
        switch (type.type) {
            case 'success':
                return <HiCheck width={width} height={height} />
            case 'error':
                return <HiExclamation width={width} height={height} />
            case 'loading':
                return <Loader style={{width : '20px'}} />
        }
    }

    return (
        <div className={clsx(styles.ToastContainer, isActive && styles.active)}>
            <Toast className={styles.toastContainerItem}>
                <div className={styles.icon} style={{backgroundColor : type.type === 'loading' ? 'unset' : type.type === 'success' ? '#DEF7EC' : '#FDE8E8',color : type.type === 'success' ? '#0E9F6E' : type.type === 'error' ? '#F05252' : ''}}>
                    {renderIcon()}
                </div>
                <div className="ml-3 text-sm font-normal">{description}</div>
            </Toast>
        </div>
    );
}
