/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import NextButton from "../../components/Form/NextButton/NextButton";
import { Link, useParams } from "react-router-dom";
import styles from "./Verification.module.css";
import StepA from "./@Steps/StepA";
import StepB from "./@Steps/StepB";

const Verification = () => {
  const { id } = useParams();
  const [step, setStep] = React.useState(0);

  const buttonText = {
    Success: "Fazer login",
    Error: "Tentar novamente",
  };

  const handleVerification = async () => {
    var data = JSON.stringify({
      objectId: id,
    });

    var config = {
      method: "post",
      headers: {
        "X-Parse-Application-Id": process.env.REACT_APP_ID,
        "X-Parse-REST-API-Key": process.env.REACT_APP_KEY,
        "Content-Type": "application/json",
      },
      body: data,
    };
    await fetch("https://parseapi.back4app.com/functions/confirmarEmail", config)
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result.emailConfirmado) setStep("Success");
        else setStep("Error");
      })
      .catch((error) => {
        throw error;
      });
  };

  React.useEffect(() => {
    handleVerification();
  }, []);

  return (
    <div className={styles.container}>
      <div className="row justify-content-center">
        <div className="col-lg-6 d-flex justify-content-center">
          <div className={styles.verification}>
            <div className={styles.verification__header}>
              <h1 className={styles.verification__header__title}>
                {step !== "Error" ? "Confirmação de conta" : "Algo deu errado"}
              </h1>
            </div>
            <form className={styles.verification__form}>
              {/* Success */}
              {step === "Success" && <StepA />}
              {step === "Success" && (
                <Link to="../login">
                  <NextButton text={buttonText[step]} distance="2rem" />
                </Link>
              )}

              {/* Error */}
              {step === "Error" && <StepB />}
              {step === "Error" && (
                <Link to="../Register">
                  <NextButton text={buttonText[step]} distance="2rem" />
                </Link>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
