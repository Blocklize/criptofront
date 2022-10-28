import React from 'react'
import Block from "../../../assets/block-1.png"
import styles from './Waiting.module.css'

const Waiting = () => {
    return (
        <div className={styles.c}>
            <h3 className={styles.title}>Por favor, aguarde!</h3>
            <span className={styles.text}>Estamos gerando sua transação...</span>
            <div className={styles.waiting}>
                <img className={styles.waiting__media} src={Block} alt="Block illustration" />
            </div>
            <span className={styles.text}>Isso poderá levar alguns segundos</span>
        </div>
    )
}

export default Waiting