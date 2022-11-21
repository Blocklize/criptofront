import React from 'react'
import Block from "../../../assets/block-1.png"
import styles from './Error.module.css'

const Error = (props) => {
    return (
        <div className={styles.c}>
            <span className={styles.text}>
                Infelizmente não conseguimos realizar a alteração de sua senha.
            </span>
            <div className={styles.error}>
                <img className={styles.error__media} src={Block} alt="Block illustration" />
            </div>
            <h5 className={styles.title}>Tente novamente usando <br /> um novo link</h5>
            <span className={styles.text}>Error: 0x0{props.errorId} - "{props.errorName}"</span>
        </div>
    )
}

export default Error