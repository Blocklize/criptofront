import React from 'react'
import Block from "../../../assets/block-1.png"
import styles from './Steps.module.css'

const StepB = () => {
    return (
        <div className={styles.step}>
            <span className={styles.text}>Ocorreu um erro inesperado! Clique no botão abaixo e tente novamente.</span>
            <div className={styles.waiting}>
                <img className={styles.waiting__media} src={Block} alt="Block illustration" />
            </div>
            <span className={styles.text}>Em caso de dúvidas, entre em contato com contato@blocklize.tech.</span>
        </div>
    )
}

export default StepB