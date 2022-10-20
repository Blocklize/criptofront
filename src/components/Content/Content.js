// React
import React from 'react'
// Components
import Carousel from '../Carousel/Carousel'
import Form from '../Form/Form'
// CSS
import styles from './Content.module.css'


const Content = () => {
  return (
    <section className={`${styles.content} row`}>
      <div className={`${styles.content__left} col-lg-6`}>
        <h1 className={styles.content__left__title}>CryptoPix</h1>
        <p className={styles.content__left__text}>
          A maneira mais fácil de converter o seu <br />
          dinheiro em criptomoedas.
        </p>
        <Carousel />
      </div>
      <div className={`${styles.content__right} col-lg-6`}>
        <Form />
      </div>
    </section>
  )
}

export default Content