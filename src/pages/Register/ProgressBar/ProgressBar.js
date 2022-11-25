/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = (props) => {
  const appearenceStyles = [
    {
      backgroundColor: "transparent",
      width: "0%",
    },
    {
      backgroundColor: "#fc0303",
      width: "10%",
    },
    {
      backgroundColor: "#eb6e34",
      width: "40%",
    },
    {
      backgroundColor: "#fccf03",
      width: "70%",
    },
    {
      backgroundColor: "#00ff11",
      width: "100%",
    },
  ];
  const [appearence, setAppearence] = React.useState(appearenceStyles[0]);

  React.useEffect(() => {
    setAppearence(appearenceStyles[props.strength])
  }, [props.strength])

  return <div className={styles.progress} style={appearence}></div>;
};

export default ProgressBar;
