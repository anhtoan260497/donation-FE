import React, { useState } from 'react';
import styles from './Header.module.scss'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

function Header() {

    const [isActive, setIsActive] = useState(false)

    return (
        <div className={styles.headerContainerFluid}>
            <div className={styles.headerContainer}>
                <h1>Donation by e-Beggars</h1>
                <ConnectButton />
            </div>

            <div className={styles.headerMobile}>
                <h1 className={styles.logo}>Donation by e-Beggars</h1>
                <FontAwesomeIcon className={styles.icon} onClick={() => setIsActive(true)} icon={faBars} />
            </div>

            <div className={clsx(styles.headerConatinerMobile, isActive && styles.active)}>
                <FontAwesomeIcon onClick={() => setIsActive(false)} className={styles.icon} icon={faXmark} />
                <h3 className={styles.logo}>Donation by e-Beggars</h3>
                <ConnectButton />
            </div>
        </div>
    );
}

export default Header;