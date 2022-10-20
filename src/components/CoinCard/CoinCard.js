// React
import React from 'react'
// CSS
import styles from './CoinCard.module.css'
// Assets
import ETH from '../../assets/eth.png'
import SimpleButton from '../SimpleButton/SimpleButton'

const CoinCard = () => {
    return (
        <div className={styles.coincard}>
            <div className={styles.coincard__header}>
                <img className={styles.coincard__header__icon} src={ETH} alt="ETH" />
                <div className={styles.coincard__header__info}>
                    <h1 className={styles.coincard__header__info__title}>ETH</h1>
                    <h1 className={styles.coincard__header__info__name}>Ethereum</h1>
                </div>
            </div>
            <div className={styles.coincard__details}>
                <h1 className={styles.coincard__details__value}>~BRL <span>6.819,80</span></h1>
                <h1 className={styles.coincard__details__rate}>
                    <span className={styles.coincard__details__rate__arrow}>↓</span>
                    <span className={styles.coincard__details__rate__value}>1,44</span>
                    <span className={styles.coincard__details__rate__perc}>%</span>
                </h1>
            </div>
            <SimpleButton text="Simular compra" />
        </div>
    )
}

export default CoinCard