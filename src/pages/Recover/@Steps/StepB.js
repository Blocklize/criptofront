import React from 'react'
import Block from "../../../assets/block-1.png"
import styles from './Steps.module.css'

const StepB = () => {
    return (
        <div className={styles.step}>
            <span className={styles.text__center}>Sua senha foi alterada com sucesso! Em caso de dúvidas, mantenha contato!</span>
            <div className={styles.waiting}>
                <img className={styles.waiting__media} src={Block} alt="Block illustration" />
            </div>
            <span className={styles.text__center}>Por favor, tente fazer login novamente utilizando a sua nova senha.</span>
        </div>
    )
}

export default StepB