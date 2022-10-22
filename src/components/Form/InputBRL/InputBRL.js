import React from 'react'
import styles from './InputBRL.module.css'
// Context
import FormsContext from '../../../contexts/FormsContext'

const Input = (props) => {
    const { validated, setValidated } = React.useContext(FormsContext)

    const field = React.useRef(null)
    const handleCurrency = (event) => {
        const onlyDigits = event.target.value
            .split("")
            .filter(s => /\d/.test(s))
            .join("")
            .padStart(3, "0")
        const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
        event.target.value = maskCurrency(digitsFloat)
        if (digitsFloat < 10) setValidated(true)
        else setValidated(false)
        localStorage.setItem("buyValue", +(event.target.value.replaceAll(".", "").replace(",", ".")))
    }

    const maskCurrency = (valor, locale = 'pt-BR', currency = 'BRL') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currencyDisplay: "code",
            currency
        }).format(valor)
            .replace("BRL", "")
            .trim()
    }

    React.useEffect(() => {
        field.current.value = maskCurrency(props.value)
    }, [props.value])

    return (
        <div className={styles.input} style={{ marginTop: props.distance }}>
            <label
                className={styles.input__label}
                htmlFor={props.name}>
                {props.label}
            </label>
            <div className={`${styles.input__field} ${validated ? styles.invalid : ""}`}>
                <span className={styles.input__field__coin}>BRL</span>
                <input
                    ref={field}
                    id={props.name}
                    name={props.name}
                    className={styles.input__field__item}
                    onInput={handleCurrency}
                    onChange={props.onChange}
                    defaultValue={props.value}
                    autoComplete="off"
                    maxLength={15}
                    type="text"
                    required
                />
            </div>
        </div>
    )
}

export default Input