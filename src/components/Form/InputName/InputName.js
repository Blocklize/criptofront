import React from 'react'
import styles from './InputName.module.css'
import Icon from '../../../assets/icon-person.png'

const InputName = (props) => {
    const [validation, setValidation] = React.useState(true)
    const [storage, setStorage] = React.useState("")

    const handleName = (event) => {
        const onlyChar = event.target.value
            .split("")
            .filter(s => /^[a-záàâãéèêíïóôõöúçñ ]+$/i.test(s))
            .join("")
        event.target.value = onlyChar
    }

    const handleValidation = (e) => {
        if (e.target.value.length < e.target.minLength) {
            setValidation(false)
            localStorage.setItem("Name", "")
        } else {
            setValidation(true)
            setStorage(e.target.value)
            localStorage.setItem("Name", e.target.value)
        }
    }

    React.useEffect(() => {
        setStorage(localStorage.getItem("Name"))
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
                    onInput={handleName}
                    onChange={handleValidation}
                    defaultValue={storage}
                    type="text"
                    minLength={6}
                    maxLength={50}
                    required
                />
            </div>
        </div>
    )
}

export default InputName