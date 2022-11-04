/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styles from './Summary.module.css'

const Summary = (props) => {
    const [price, setPrice] = React.useState(0)
    const [fee, setFee] = React.useState(0)
    const [gas, setGas] = React.useState(0)

    const maskCurrency = (valor, locale = 'pt-BR', currency = 'BRL') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currencyDisplay: "code",
            currency
        }).format(valor)
            .replace("BRL", "")
            .trim()
    }

    const formatValue = (value) => {
        if (value) {
            const formated = value.toFixed(5)
            return maskCurrency(formated)
        } else {
            return maskCurrency(0)
        }
    }

    React.useEffect(() => {
        setPrice(props.price)
        setFee(formatValue(props.tax))
        setGas(formatValue(props.gas))
    }, [fee, formatValue, price, props])

    return (
        <div className={styles.summary} style={{ marginTop: props.distance }}>
            <div className={styles.summary__coinPrice}>
                <span className={styles.summary__coinPrice__title}>
                    Preço do {props.coin}
                </span>
                <span className={styles.summary__coinPrice__value}>
                    BRL {maskCurrency(price)}
                </span>
            </div>
            <div className={styles.summary__fee}>
                <span className={styles.summary__fee__title}>
                    Taxa de processamento
                </span>
                <span className={styles.summary__fee__value}>
                    BRL {fee}
                </span>
            </div>
            <div className={styles.summary__total}>
                <span className={styles.summary__total__title}>
                    Taxa de gás
                </span>
                <span className={styles.summary__total__value}>
                    BRL {gas}
                </span>
            </div>
        </div>
    )
}

export default Summary