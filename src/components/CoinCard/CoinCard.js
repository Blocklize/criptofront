// React
import React from 'react'
// CSS
import styles from './CoinCard.module.css'
// Components
import SimpleButton from '../SimpleButton/SimpleButton'
// Context
import TokenContext from '../../contexts/TokenContext'

const CoinCard = (props) => {
    const { setToken } = React.useContext(TokenContext)

    const maskCurrency = (valor, locale = 'pt-BR', currency = 'BRL') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currencyDisplay: "code",
            currency
        }).format(valor)
            .replace("BRL", "")
            .trim()
    }

    const handleSimulation = (e) => {
        e.preventDefault()
        const tokenData = {
            TokenSymbol: props.symbol,
            TokenAddress: props.address,
        }
        setToken(tokenData)
    }

    return (
        <div className={styles.coincard}>
            <div className={styles.coincard__header}>
                <img className={styles.coincard__header__icon}
                    src={require(`../../assets/icons/${props.symbol}.png`)} alt="Token icon" />
                <div className={styles.coincard__header__info}>
                    <h1 className={styles.coincard__header__info__title}>{props.symbol}</h1>
                    <h1 className={styles.coincard__header__info__name}>{props.name}</h1>
                </div>
            </div>
            <div className={styles.coincard__details}>
                <h1 className={styles.coincard__details__value}>~BRL <span>{maskCurrency(props.price)}</span></h1>
                <h1 className={styles.coincard__details__rate}>
                    POR TOKEN
                </h1>
            </div>
            <SimpleButton
                text="Simular compra"
                onClick={handleSimulation}
            />
        </div>
    )
}

export default CoinCard