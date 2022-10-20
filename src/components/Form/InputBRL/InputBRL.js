import React from 'react'
import styles from './InputBRL.module.css'


const Input = (props) => {
    return (
        <div className={styles.input} style={{ 'margin-top': props.distance}}>
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
                    value="6.819,80"
                    required
                />
            </div>
        </div>
    )
}

export default Input