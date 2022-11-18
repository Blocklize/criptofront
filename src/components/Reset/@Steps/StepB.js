import React from 'react'
import Block from "../../../assets/block-1.png"
import styles from './Steps.module.css'

const StepB = () => {
    return (
        <div className={styles.step}>
            <span className={styles.text__center}>Enviamos um e-mail de recuperação para <br /> você, clique no link e restaure sua senha.</span>
            <div className={styles.waiting}>
                <img className={styles.waiting__media} src={Block} alt="Block illustration" />
            </div>
            <span className={styles.text__center}>Por favor, não compartilhe este link <br /> com ninguém.</span>
        </div>
    )
}

export default StepB