/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
// CSS
import "./Steps.css"
// Components
import InputName from '../InputName/InputName'
import InputEmail from '../InputEmail/InputEmail'
import InputCPF from '../InputCPF/InputCPF'

const StepB = (props) => {
  const entranceConfig = {
    animation: "entrance .5s ease-out"
  }

  const [valid, setValid] = React.useState(false)
  const [name, setName] = React.useState(false)
  const [email, setEmail] = React.useState(false)
  const [cpf, setCpf] = React.useState(false)
  const [check, setCheck] = React.useState(true)

  const handleValidator = () => {
    if (name && email && cpf) setValid(true)
    else setValid(false)
  }

  React.useEffect(() => {
    handleValidator()
  }, [name, email, cpf])

  React.useEffect(() => {
    props.extra(valid)
  }, [valid])

  React.useEffect(() => {
    setCheck(props.check)
  }, [props.check])

  return (
    <div style={entranceConfig}>
      <InputName label="Digite seu nome" distance="1rem" extra={setName} check={check} />
      <InputEmail label="Digite seu e-mail" distance="1rem" extra={setEmail} check={check} />
      <InputCPF label="Digite seu CPF" distance="1rem" extra={setCpf} check={check} />
    </div>
  )
}

export default StepB