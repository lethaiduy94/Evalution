import React from 'react'
import styles from './loading.module.css'


export default function Loading() {
    return (
        <div className={styles.container}>
            <p>LOADING...</p>
            <div className = {styles.loader}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>
    )
}
