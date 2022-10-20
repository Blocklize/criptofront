import React from 'react'
import styles from './Summary.module.css'

const Summary = (props) => {
    const [price, setPrice] = React.useState(props.price)
    const [fee, setFee] = React.useState(price * .01)
    const [total, setTotal] = React.useState(price + fee)

    React.useEffect(() => {
        setPrice(props.price)
        setFee(price * .01)
        setTotal(price + fee)
    }, [fee, price, props])

    return (
        <div className={styles.summary} style={{ marginTop: props.distance }}>
            <div className={styles.summary__coinPrice}>
                <span className={styles.summary__coinPrice__title}>
                    Preço do {props.coin}
                </span>
                <span className={styles.summary__coinPrice__value}>
                    BRL {price.toFixed(2)}
                </span>
            </div>
            <div className={styles.summary__fee}>
                <span className={styles.summary__fee__title}>
                    Taxa de processamento
                </span>
                <span className={styles.summary__fee__value}>
                    BRL {fee.toFixed(2)}
                </span>
            </div>
            <div className={styles.summary__total}>
                <span className={styles.summary__total__title}>
                    Valor total
                </span>
                <span className={styles.summary__total__value}>
                    BRL {total.toFixed(2)}
                </span>
            </div>
        </div>
    )
}

export default Summary