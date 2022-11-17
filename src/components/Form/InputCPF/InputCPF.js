/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styles from './InputCPF.module.css'
import Icon from '../../../assets/icon-cpf.png'
import UserContext from '../../../contexts/UserContext'

const InputCPF = (props) => {
    const { user } = React.useContext(UserContext)
    const [readOnly, setReadOnly] = React.useState(false)
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
            localStorage.removeItem("CPF")
        } else {
            setValidation(true)
            setStorage(onlyDigits)
            localStorage.setItem("CPF", onlyDigits)
        }
    }

    React.useEffect(() => {
        if (props.extra) props.extra(validation)
    }, [validation])

    React.useEffect(() => {
        if (props.extra) props.extra(!validation)
    }, [])

    const maskCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, "")
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        return cpf
    }

    React.useEffect(() => {
        if (localStorage.getItem("CPF") || user.CPF) {
            setStorage(localStorage.getItem("CPF") || user.CPF)
            setValidation(true)
            props.extra(validation)
        }
    }, [storage])

    React.useEffect(() => {
        if (props.check !== undefined) {
            if (!localStorage.getItem("CPF")) {
                setValidation(props.check)
            }
        }
    }, [props.check])

    React.useEffect(() => {
        if (user.CPF) {
            setReadOnly(true)
        }
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
                    onInput={handleCPF}
                    defaultValue={maskCPF(storage)}
                    readOnly={readOnly}
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