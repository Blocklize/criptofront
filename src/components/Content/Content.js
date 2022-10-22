// React
import React from 'react'
// Components
import Carousel from '../Carousel/Carousel'
import Form from '../Form/Form'
// Contexts
import FormsContext from '../../contexts/FormsContext'
// CSS
import styles from './Content.module.css'


const Content = () => {
  const [validated, setValidated] = React.useState(false)
  return (
    <section className={`${styles.content} row d-flex justify-content-center`}>
      <div className={`${styles.content__left} col-lg-6 d-lg-block d-none`}>
        <h1 className={styles.content__left__title}>CryptoPix</h1>
        <p className={styles.content__left__text}>
          A maneira mais fácil de converter o seu <br />
          dinheiro em criptomoedas.
        </p>
        <Carousel />
      </div>
      <div className={`${styles.content__right} col-lg-6`}>
        <FormsContext.Provider value={{ validated, setValidated }}>
          <Form />
        </FormsContext.Provider>
      </div>
    </section>
  )
}

export default Content