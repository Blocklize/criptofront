import React from 'react'
import styles from './InputCoin.module.css'
import Icon from '../../../assets/eth.png'
import Chevron from '../../../assets/chevron.png'

const InputCoin = (props) => {
    return (
        <div className={styles.input} style={{ 'margin-top': props.distance}}>
            <label
                className={styles.input__label}
                htmlFor={props.name}>
                {props.label}
            </label>
            <div className={styles.input__field}>
                <div className={styles.input__field__coin}>
                    <img className={styles.input__field__coin__icon} src={Icon} alt="Coin icon" />
                    <span className={styles.input__field__coin__tag}>ETH</span>
                    <img className={styles.input__field__coin__arrow} src={Chevron} alt="Arrow icon" />
                </div>
                <input
                    id={props.name}
                    name={props.name}
                    className={styles.input__field__item}
                    type="text"
                    value="1.0000"
                    required
                />
            </div>
        </div>
    )
}

export default InputCoin