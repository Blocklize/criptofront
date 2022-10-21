import React from 'react'
import styles from "./InfoProvider.module.css"
import Copy from "../../../assets/Copy.png"
const InfoProvider = (props) => {
  const handleCopy = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(props.info)
  }

  return (
    <div className={styles.info}>
        <input className={styles.info__text} defaultValue={props.info} readOnly />
        <button className={styles.info__button} onClick={handleCopy}>
            <img className={styles.info__button__icon} src={Copy} alt="Copy to clipboard icon" />
        </button>
    </div>
  )
}

export default InfoProvider