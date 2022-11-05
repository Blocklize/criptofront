/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styles from './Skeleton.module.css'
import SimpleButton from '../../SimpleButton/SimpleButton'

const Skeleton = () => {
    return (
        <div className={styles.skeleton}>
            <div className={styles.skeleton__header}>
                <div className={styles.skeleton__header__icon} alt="Icon Skeleton" />
                <div className={styles.skeleton__header__info}>
                    <h1 className={styles.skeleton__header__info__title}>&nbsp;</h1>
                    <h1 className={styles.skeleton__header__info__name}>&nbsp;</h1>
                </div>
            </div>
            <div className={styles.skeleton__details}>
                <h1 className={styles.skeleton__details__value}>&nbsp;</h1>
                <h1 className={styles.skeleton__details__rate}>&nbsp;</h1>
            </div>
            <SimpleButton text="&nbsp;" disabled={true} />
        </div>
    )
}

export default Skeleton