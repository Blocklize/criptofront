import React from 'react'
import styles from './ProgressBar.module.css'

const ProgressBar = (props) => {
  const [appearence, setAppearence] = React.useState({
    backgroundColor: "#00ff11",
    width: "80%"
  })

  React.useState(() => {
    setAppearence({
      backgroundColor: "#00ff11",
      width: "80%"
    })
  })

  return (
    <div className={styles.progress} style={appearence}></div>
  )
}

export default ProgressBar