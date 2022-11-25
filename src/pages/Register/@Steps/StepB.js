/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import InputPass from "../../../components/Form/InputPass/InputPass";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./Steps.module.css";

const StepB = (props) => {
  const [valid, setValid] = React.useState(false);
  const [match, setMatch] = React.useState(false);
  const [pass, setPass] = React.useState(false);
  const [check, setCheck] = React.useState(true);
  const [strength, setStrength] = React.useState(3);

  const handleValidator = () => {
    if (pass && match) setValid(true);
    else setValid(false);
  };

  const handleProgress = (key) => {
    if (!key) {
      setStrength(0);
    } else if (key.length < 8) {
      setStrength(1);
    } else if (key.length >= 8 && key.length < 12) {
      setStrength(2);
    } else if (key.length >= 12 && key.length < 15) {
      setStrength(3);
    } else if (key.length >= 15 && key.length <= 30) {
      setStrength(4);
    }
  };

  React.useEffect(() => {
    props.extra(true);
    handleValidator();
  }, [pass, match]);

  React.useEffect(() => {
    props.extra(valid);
  }, [valid]);

  React.useEffect(() => {
    setCheck(props.check);
  }, [props.check]);

  return (
    <div className={styles.step}>
      <InputPass
        label="Crie sua senha"
        distance="1rem"
        strChanger={handleProgress}
        extra={setPass}
        check={check}
        kind={"Key"}
      />
      <p className={styles.description}>
        Deve ter ao menos 8 caracteres; <br />
        Deve ter ao menos um número; <br />
        Deve ter ao menos um caractere especial. <br />
        Deve ter ao menos uma letra maiúscula e minúscula;
      </p>
      <ProgressBar strength={strength} />
      <InputPass
        label="Confirme a sua senha"
        distance="1rem"
        extra={setMatch}
        check={check}
        kind={"Match"}
      />
    </div>
  );
};

export default StepB;
