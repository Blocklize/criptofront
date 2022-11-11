import React from 'react'
import styles from './InputPass.module.css'
import Icon from '../../../assets/icon-lock.png'

const InputPass = (props) => {
    const [validation, setValidation] = React.useState(true)

    const handleValidation = (e) => {
        if (e.target.value) {
            setValidation(true)
        } else {
            setValidation(false)
        }
    }

    return (
        <div className={styles.input} style={{ marginTop: props.distance }}>
            <label
                className={styles.input__label}
                htmlFor={props.name}>
                {props.label}
            </label>
            <div className={`${styles.input__field} ${!validation ? styles.invalid : ""}`}>
                <div className={styles.input__field__icon}>
                    <img className={styles.input__field__icon__media} src={Icon} alt="Icon" />
                </div>
                <input
                    id={props.name}
                    name={props.name}
                    className={styles.input__field__item}
                    onChange={handleValidation}
                    type="password"
                    required
                />
            </div>
        </div>
    )
}

export default InputPass