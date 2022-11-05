/* eslint-disable react-hooks/exhaustive-deps */
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
    const [price, setPrice] = React.useState(0)
    const mainToken = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"

    const getValue = async () => {
        await fetch(`https://api.1inch.io/v4.0/137/quote?fromTokenAddress=${mainToken}&toTokenAddress=${props.address}&amount=${1000000}`)
            .then(res => res.json())
            .then(async json => {
                const tokenAmountForValue = (json.toTokenAmount / Math.pow(10, json.toToken.decimals))
                await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
                    .then(resp => resp.json())
                    .then(json => {
                        let value = json.USDBRL.bid * (1 / tokenAmountForValue)
                        value += value * 0.010 // Inflação de 1%
                        value += value * 0.017 // Taxa de processamento simples
                        value += 0.502
                        setPrice(value)
                    })
                    .catch(error => {
                        console.log(error)
                        setPrice(0)
                    })
            })
            .catch(error => {
                console.log(error)
                setPrice(0)
            })
    }

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
            TokenLogo: props.image,
            TokenSymbol: props.symbol,
            TokenAddress: props.address,
        }
        setToken(tokenData)
    }

    React.useEffect(() => {
        getValue()
    }, [])

    return (
        <div className={styles.coincard}>
            <div className={styles.coincard__header}>
                <img className={styles.coincard__header__icon}
                    src={props.image} alt="Token icon" />
                <div className={styles.coincard__header__info}>
                    <h1 className={styles.coincard__header__info__title}>{props.symbol}</h1>
                    <h1 className={styles.coincard__header__info__name}>{props.name}</h1>
                </div>
            </div>
            <div className={styles.coincard__details}>
                <h1 className={styles.coincard__details__value}>~BRL <span>{maskCurrency(price)}</span></h1>
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