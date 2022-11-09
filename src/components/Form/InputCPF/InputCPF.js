import React from 'react'
import styles from './InputCPF.module.css'
import Icon from '../../../assets/icon-cpf.png'

const InputCPF = (props) => {
    const [validation, setValidation] = React.useState(true)
    const [storage, setStorage] = React.useState("")

    const handleCPF = (event) => {
        const onlyDigits = event.target.value
            .split("")
            .filter(s => /\d/.test(s))
            .join("")
        event.target.value = maskCPF(onlyDigits)

        if (event.target.value.length < event.target.minLength) {
            setValidation(false)
            localStorage.setItem("CPF", "")
        } else {
            setValidation(true)
            setStorage(onlyDigits)
            localStorage.setItem("CPF", onlyDigits)
        }
    }

    const maskCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, "")
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        return cpf
    }

    React.useEffect(() => {
        if (localStorage.getItem("CPF")) setStorage(localStorage.getItem("CPF"))
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
                    onInput={handleCPF}
                    defaultValue={maskCPF(storage)}
                    maxLength={14}
                    minLength={14}
                    type="text"
                    required
                />
            </div>
        </div>
    )
}

export default InputCPF