/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styles from './InputEmail.module.css'
import Icon from '../../../assets/icon-at.png'
import UserContext from '../../../contexts/UserContext'

const InputEmail = (props) => {
    const field = React.useRef(null)
    const { user } = React.useContext(UserContext)
    const [readOnly, setReadOnly] = React.useState(false)
    const [validation, setValidation] = React.useState(true)
    const [storage, setStorage] = React.useState("")

    const handleValidation = async (e) => {
        const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (mailRegex.test(e.target.value)) {
            setStorage(e.target.value)
            localStorage.setItem("Email", e.target.value)
            if (props.database !== undefined) {
                const result = await props.database(e.target.value)
                setValidation(!result)
            }
            else setValidation(true)
        } else {
            setValidation(false)
            localStorage.removeItem("Email")
        }
    }

    React.useEffect(() => {
        if (props.extra) props.extra(validation)
    }, [validation])

    React.useEffect(() => {
        if (props.extra) props.extra(!validation)
    }, [])

    React.useEffect(() => {
        if (localStorage.getItem("Email") || user.Email) {
            setStorage(localStorage.getItem("Email") || user.Email)
            setValidation(true)
            props.extra(validation)
        }
    }, [storage])

    React.useEffect(() => {
        if (props.check !== undefined) {
            if (!localStorage.getItem("Email")) {
                setValidation(props.check)
            }
        }
    }, [props.check])

    React.useEffect(() => {
        (async () => {
            if (props.database !== undefined) {
                const result = await props.database(localStorage.getItem("Email"))
                setValidation(!result)
            }
            else setValidation(true)
        })()
    }, [])

    React.useEffect(() => {
        if (user.Email) {
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
                    ref={field}
                    id={props.name}
                    name={props.name}
                    className={styles.input__field__item}
                    onChange={handleValidation}
                    defaultValue={storage}
                    readOnly={readOnly}
                    type="email"
                    required
                />
            </div>
        </div>
    )
}

export default InputEmail