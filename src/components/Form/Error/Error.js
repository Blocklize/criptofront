import React from 'react'
import Block from "../../../assets/block-1.png"
import styles from './Error.module.css'

const Error = () => {
    return (
        <div className={styles.c}>
            <h3 className={styles.title}>Transação não realizada!</h3>
            <span className={styles.text}>15:34:18 - 02/10/2022 - BRL 6.894,41</span>
            <div className={styles.error}>
                <img className={styles.error__media} src={Block} alt="Block illustration" />
            </div>
            <h5 className={styles.title}>Verifique os dados digitados <br /> e tente novamente!</h5>
            <span className={styles.text}>Error: 0x0003 - "IVALID_DATA_PROCESSING"</span>
        </div>
    )
}

export default Error