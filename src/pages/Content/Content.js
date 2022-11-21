// React
import React from 'react'
// Components
import Carousel from '../../components/Carousel/Carousel'
import Form from '../../components/Form/Form'
// Contexts
import FormsContext from '../../contexts/FormsContext'
import TokenContext from '../../contexts/TokenContext'
// CSS
import styles from './Content.module.css'


const Content = () => {
  // Context
  const [token, setToken] = React.useState({
    TokenSymbol: "AVAX",
    TokenAddress: "0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b",
    TokenLogo: "https://tokens.1inch.io/0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b.png",
  })
  const [validated, setValidated] = React.useState(false)
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <section className={`${styles.content} row d-flex justify-content-center`}>
        <div className={`${styles.content__left} col-lg-6 d-lg-block d-none`}>
          <h1 className={styles.content__left__title}>CriptoPix</h1>
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
    </TokenContext.Provider>
  )
}

export default Content