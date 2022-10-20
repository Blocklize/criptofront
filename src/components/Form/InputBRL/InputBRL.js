import React from 'react'
import styles from './InputBRL.module.css'

// Regex: ^\s*(?:[1-9]\d{0,2}(?:\.\d{3})*|0)(?:,\d{1,2})?$

const Input = (props) => {
    return (
        <div className={styles.input} style={{ marginTop: props.distance}}>
            <label
                className={styles.input__label}
                htmlFor={props.name}>
                {props.label}
            </label>
            <div className={styles.input__field}>
                <span className={styles.input__field__coin}>BRL</span>
                <input
                    id={props.name}
                    name={props.name}
                    className={styles.input__field__item}
                    type="text"
                    required
                />
            </div>
        </div>
    )
}

export default Input