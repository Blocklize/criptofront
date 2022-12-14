/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styles from './InputName.module.css'
import Icon from '../../../assets/icon-person.png'
import UserContext from '../../../contexts/UserContext'

const InputName = (props) => {
    const { user } = React.useContext(UserContext)
    const [validation, setValidation] = React.useState(true)
    const [readOnly, setReadOnly] = React.useState(false)
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
            localStorage.removeItem("Name")
        } else {
            setValidation(true)
            setStorage(e.target.value)
            localStorage.setItem("Name", e.target.value)
        }
    }

    React.useEffect(() => {
        if (props.extra) props.extra(validation)
    }, [validation])

    React.useEffect(() => {
        if (props.extra) {
            props.extra(!validation)
        }
    }, [])

    React.useEffect(() => {
        if (localStorage.getItem("Name") || user.Name) {
            setStorage(localStorage.getItem("Name") || user.Name)
            setValidation(true)
            props.extra(validation)
        }
    }, [storage])

    React.useEffect(() => {
        if (props.check !== undefined) {
            if (!localStorage.getItem("Name")) {
                setValidation(props.check)
            }
        }
    }, [props.check])

    React.useEffect(() => {
        if (user.Name) {
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
                    onInput={handleName}
                    onChange={handleValidation}
                    defaultValue={storage}
                    readOnly={readOnly}
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