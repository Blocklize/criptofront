import React from 'react'
import Block from "../../../assets/block-1.png"
import styles from './Steps.module.css'

const StepC = () => {
    return (
        <div className={styles.step}>
            <span className={styles.text}>Enviamos um e-mail de confirmação para <br /> você, clique no link e ative sua conta.</span>
            <div className={styles.waiting}>
                <img className={styles.waiting__media} src={Block} alt="Block illustration" />
            </div>
            <span className={styles.text}>Por favor, confirme sua conta para <br /> acessar a plataforma.</span>
        </div>
    )
}

export default StepC