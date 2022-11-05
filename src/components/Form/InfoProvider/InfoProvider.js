import React from 'react'
import styles from "./InfoProvider.module.css"
import Copy from "../../../assets/Copy.png"
const InfoProvider = (props) => {
    const [last, setLast] = React.useState(0)
    const [feedback, setFeedback] = React.useState(false)
  
  const showFeedback = () => {
    setFeedback(true)
    setTimeout(() => {
      setFeedback(false)
    }, 3000);
  }

  const handleCopy = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(props.info)
    throttle(showFeedback(), 3000)
  }

  // Throttle function prevent user multiple clicks
  const throttle = (cb, delay) => {
    return (...args) => {
        const now = new Date().getTime()
        if (now - last < delay) {
            return
        }
        setLast(now)
        return cb(...args)
    }
}

  return (
    <div className={styles.info}>
        <div className={styles.info__feedback} disabled={!feedback}>Copiado!</div>
        <input className={styles.info__text} defaultValue={props.info} readOnly />
        <button className={styles.info__button} onClick={handleCopy}>
            <img className={styles.info__button__icon} src={Copy} alt="Copy to clipboard icon" />
        </button>
    </div>
  )
}

export default InfoProvider