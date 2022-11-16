/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styles from './InputPass.module.css'
import Icon from '../../../assets/icon-lock.png'

const InputPass = (props) => {
    const [validation, setValidation] = React.useState(true)

    const handlePassword = (e) => {
        const value = e.target.value
        if (props.kind !== "Password") {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
            if (passwordRegex.test(value)) {
                setValidation(true)
                localStorage.setItem(props.kind, e.target.value)
            } else {
                setValidation(false)
                localStorage.removeItem(props.kind)
            }
        } else {
            if (value < 1) {
                setValidation(false)
                localStorage.removeItem(props.kind)
            }
            else {
                setValidation(true)
                localStorage.setItem(props.kind, e.target.value)
            }
        }
    }

    React.useEffect(() => {
        if (props.check !== undefined) {
            setValidation(props.check)
        }
    }, [props.check])

    React.useEffect(() => {
        if (props.extra) props.extra(validation)
    }, [validation])

    React.useEffect(() => {
        if (props.extra) props.extra(!validation)
    }, [])

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
                    onInput={handlePassword}
                    onChange={handlePassword}
                    type="password"
                    required
                />
            </div>
        </div>
    )
}

export default InputPass