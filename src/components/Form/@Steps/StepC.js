import React from 'react'
import "./Steps.css"
import styles from "./StepC.module.css"
import QR from "../../../assets/QR.png"
import Pix from "../../../assets/pix.png"
import InfoProvider from '../InfoProvider/InfoProvider'

const StepC = () => {
    const entranceConfig = {
        animation: "entrance .5s ease-out"
    }

    return (
        <div className={styles.step} style={entranceConfig}>
            <div className={styles.header}>
                <img className={styles.header__media} src={Pix} alt="Block illustration" />
                <span className={styles.header__details}>Escaneie o QR code</span>
            </div>
            <div className={styles.block}>
                <img className={styles.block__media} src={QR} alt="Block illustration" />
            </div>
            <div className={styles.transaction}>
                <span className={styles.transaction__text}>ou</span>
                <InfoProvider info="00020126360014BR.GOV.BCB.PIX01551194041904952040000530398654041.005802BR5924LUIZ FELIPE P CAVALCANTE6009SAO PAULO62070503***63047C24" />
            </div>
        </div>
    )
}

export default StepC