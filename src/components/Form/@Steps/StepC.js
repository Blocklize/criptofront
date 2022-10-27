import React from 'react'
import "./Steps.css"
import styles from "./StepC.module.css"
// import QR from "../../../assets/QR.png"
import Pix from "../../../assets/pix.png"
import InfoProvider from '../InfoProvider/InfoProvider'

const StepC = (props) => {
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
                <img className={styles.block__media} src={props.qr} alt="Block illustration" />
            </div>
            <div className={styles.transaction}>
                <span className={styles.transaction__text}>ou</span>
                <InfoProvider info={props.br} />
            </div>
        </div>
    )
}

export default StepC