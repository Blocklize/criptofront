import React from 'react'
// CSS
import "./Steps.css"
// Components
import InputName from '../InputName/InputName'
import InputEmail from '../InputEmail/InputEmail'
import InputCPF from '../InputCPF/InputCPF'

const StepB = () => {
  const entranceConfig = {
    animation: "entrance .5s ease-out"
  }

  return (
    <div style={entranceConfig}>
      <InputName label="Digite seu nome" />
      <InputEmail label="Digite seu e-mail" distance="1rem" />
      <InputCPF label="Digite seu CPF" distance="1rem" />
    </div>
  )
}

export default StepB