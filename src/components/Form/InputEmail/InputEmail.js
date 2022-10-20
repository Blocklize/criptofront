import React from 'react'
import styles from './InputEmail.module.css'
import Icon from '../../../assets/icon-at.png'
const InputEmail = (props) => {
    return (
        <div className={styles.input} style={{ 'margin-top': props.distance }}>
            <label
                className={styles.input__label}
                htmlFor={props.name}>
                {props.label}
            </label>
            <div className={styles.input__field}>
                <div className={styles.input__field__icon}>
                    <img className={styles.input__field__icon__media} src={Icon} alt="Icon" />
                </div>
                <input
                    id={props.name}
                    name={props.name}
                    className={styles.input__field__item}
                    type="email"
                    required
                />
            </div>
        </div>
    )
}

export default InputEmail