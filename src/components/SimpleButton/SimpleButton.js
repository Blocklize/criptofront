import React from 'react'
import styles from './SimpleButton.module.css'
const SimpleButton = (props) => {
  return (
    <button
      className={styles.simplebutton}
      disabled={props.disabled}
      onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default SimpleButton