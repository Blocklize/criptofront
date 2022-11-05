import React from 'react'
import Block from "../../../assets/block-1.png"
import styles from './Error.module.css'

const Error = (props) => {
    return (
        <div className={styles.c}>
            <h3 className={styles.title}>Transação não realizada!</h3>
            <span className={styles.text}>{props.date}</span>
            <div className={styles.error}>
                <img className={styles.error__media} src={Block} alt="Block illustration" />
            </div>
            <h5 className={styles.title}>{props.message}</h5>
            <span className={styles.text}>Error: 0x0{props.errorId} - "{props.errorName}"</span>
        </div>
    )
}

export default Error