import React from 'react'
import styles from './LoginCheckbox.module.css'

const LoginCheckbox = (props) => {
    return (
        <div className={`${styles.input} form-check`}>
            <input className={`${styles.input__check} form-check-input`} type="checkbox" value="true" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                {props.message}
            </label>
        </div>
    )
}

export default LoginCheckbox