import React from 'react'
import Eye from '../../assets/eye.png'
import EyeOff from '../../assets/eye-off.png'
import styles from './CoinWallet.module.css'

const CoinWallet = (props) => {
    const [visible, setVisible] = React.useState(false)
    const handleShow = () => {
        setVisible(!visible)
    }
    return (
        <div className={styles.coinwallet} data-active={visible}>
            <div className={styles.coinwallet__info}>
                <img className={styles.coinwallet__info__icon}
                    src={props.image} alt="Token icon" />
                <div className={styles.coinwallet__info__info}>
                    <h1 className={styles.coinwallet__info__info__title}>{props.symbol}</h1>
                    <h1 className={styles.coinwallet__info__info__name}>{props.name}</h1>
                </div>
            </div>
            <div className={styles.coinwallet__amount}>
                <input className={styles.coinwallet__amount__input} type={visible ? 'text' : 'password'} defaultValue="0.0000" readOnly />
                <button className={styles.coinwallet__amount__button} onClick={handleShow}>
                    <img src={visible ? Eye : EyeOff} alt="Eye icon" />
                </button>
            </div>
        </div>
    )
}

export default CoinWallet