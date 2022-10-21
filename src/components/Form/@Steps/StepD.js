import React from 'react'
import "./Steps.css"
import styles from "./StepD.module.css"
import Block from "../../../assets/block2.png"
import InfoProvider from '../InfoProvider/InfoProvider'

const StepD = () => {
    const entranceConfig = {
        animation: "entrance .5s ease-out"
    }

    return (
        <div className={styles.step} style={entranceConfig}>
            <div className={styles.header}>
                <h3 className={styles.header__title}>Transação finalizada!</h3>
                <span className={styles.header__details}>15:34:18 - 20/10/2022 - BRL 6.894,41</span>
            </div>
            <div className={styles.block}>
                <img className={styles.block__media} src={Block} alt="Block illustration" />
            </div>
            <div className={styles.transaction}>
                <span className={styles.transaction__text}>ID da transação</span>
                <InfoProvider info="1354TRANSACTION.ID12345-OKSOM1354TRANSACTION.ID12345-OKSOM" />
            </div>
        </div>
    )
}

export default StepD