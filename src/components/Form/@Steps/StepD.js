import React from 'react'
import "./Steps.css"
import styles from "./StepD.module.css"
import Block from "../../../assets/block2.png"
import InfoProvider from '../InfoProvider/InfoProvider'

const StepD = (props) => {
    const entranceConfig = {
        animation: "entrance .5s ease-out"
    }

    const formatTime = () => {
        let timestamp = props.transactionTime * 1000;
        let dateObj = new Date(timestamp)
        let h = ("0" + (dateObj.getHours())).slice(-2)
        let m = ("0" + (dateObj.getMinutes())).slice(-2)
        let s = ("0" + (dateObj.getSeconds())).slice(-2)
        const hours = `${h}:${m}:${s}`

        let d = ("0" + (dateObj.getDate())).slice(-2)
        let M = ("0" + (dateObj.getMonth() + 1)).slice(-2)
        let y = dateObj.getFullYear()
        const date = `${d}/${M}/${y}`

        return `${hours} - ${date} - BRL`
    }

    const formatPrice = () => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currencyDisplay: "code",
            currency: 'BRL'
        }).format(props.transactionPrice)
            .replace("BRL", "")
            .trim()
    }

    const getTransactionInfo = () => {
        return `${formatTime()} ${formatPrice()}`
    }

    return (
        <div className={styles.step} style={entranceConfig}>
            <div className={styles.header}>
                <h3 className={styles.header__title}>Transação finalizada!</h3>
                <span className={styles.header__details}>{getTransactionInfo()}</span>
            </div>
            <div className={styles.block}>
                <img className={styles.block__media} src={Block} alt="Block illustration" />
            </div>
            <div className={styles.transaction}>
                <span className={styles.transaction__text}>ID da transação</span>
                <InfoProvider info={props.transactionId} />
            </div>
        </div>
    )
}

export default StepD