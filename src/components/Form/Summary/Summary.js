import React from 'react'
import styles from './Summary.module.css'

const Summary = (props) => {
    const [price, setPrice] = React.useState(props.price)
    const [fee, setFee] = React.useState(price * .01)
    const [gas, setGas] = React.useState(price + fee)

    React.useEffect(() => {
        setPrice(props.price)
        setFee(price * .025)
        setGas(props.gas)
    }, [fee, price, props])

    const maskCurrency = (valor, locale = 'pt-BR', currency = 'BRL') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currencyDisplay: "code",
            currency
        }).format(valor)
            .replace("BRL", "")
            .trim()
    }

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
                    BRL {maskCurrency(fee)}
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