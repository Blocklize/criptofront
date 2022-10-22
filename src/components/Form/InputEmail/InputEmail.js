import React from 'react'
import styles from './InputEmail.module.css'
import Icon from '../../../assets/icon-at.png'

const InputEmail = (props) => {
    const [validation, setValidation] = React.useState(true)
    const [storage, setStorage] = React.useState("")

    const handleValidation = (e) => {
        const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (mailRegex.test(e.target.value)) {
            setValidation(true)
            setStorage(e.target.value)
            localStorage.setItem("Email", e.target.value)
        } else {
            setValidation(false)
            localStorage.setItem("Email", "")
        }
    }

    React.useEffect(() => {
        setStorage(localStorage.getItem("Email"))
    }, [storage])

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
                    defaultValue={storage}
                    type="email"
                    required
                />
            </div>
        </div>
    )
}

export default InputEmail