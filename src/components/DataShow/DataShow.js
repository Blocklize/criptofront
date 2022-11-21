import React from 'react'
import styles from './DataShow.module.css'

const DataShow = (props) => {
    return (
        <div className={styles.datashow}>
            <label className={styles.datashow__label} htmlFor={props.id}>{props.label}</label>
            <input className={styles.datashow__input} type="text" defaultValue={props.info} readOnly />
        </div>
    )
}

export default DataShow