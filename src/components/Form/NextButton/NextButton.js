import React from 'react'
import styles from './NextButton.module.css'

const NextButton = (props) => {
  return (
    <button
      className={styles.next}
      style={{ 'margin-top': props.distance }}
      disabled={props.disabled}
      onClick={props.onClick}
      >
      {props.text}
    </button>
  )
}

export default NextButton