// React
import React from 'react'
// Components
import CoinCard from '../CoinCard/CoinCard'
// CSS
import styles from './Carousel.module.css'

const Carousel = () => {
    return (
        <div className={styles.carousel}>
            <CoinCard />
            <CoinCard />
        </div>
    )
}

export default Carousel