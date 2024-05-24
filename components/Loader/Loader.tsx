import React from 'react';
import styles from './Loader.module.scss'

function Loader({style} : any) {
    return (
        <div className={styles.loader} style={style}></div>
    );
}

export default Loader;