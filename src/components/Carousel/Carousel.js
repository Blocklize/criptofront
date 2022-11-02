/* eslint-disable react-hooks/exhaustive-deps */
// React
import React from 'react'
// Components
import CoinCard from '../CoinCard/CoinCard'
// CSS
import styles from './Carousel.module.css'
// Imports
import Chevron from '../../assets/chevron.png'
import Skeleton from './Skeleton/Skeleton'

const Carousel = () => {
    // Refs
    const carousel = React.useRef(null)
    const bar = React.useRef(null)

    // Math resources
    const ratio = (window.innerWidth / 1920 * 20)
    const distance = ratio * 19.5

    // States
    const [last, setLast] = React.useState(0)
    const [tokens, setTokens] = React.useState([])
    const [labels, setLabels] = React.useState("")
    const [scrolled, setScrolled] = React.useState(0)
    const [barLeft, setBarLeft] = React.useState("0")
    const [totalScroll, setTotalScroll] = React.useState("")
    const [scrollCounter, setScrollCounter] = React.useState(0)

    React.useEffect(() => {
        const scrollOffset = carousel.current.scrollWidth - (2 * distance)
        setTotalScroll(scrollOffset)
        setLabels(Math.round(carousel.current.scrollWidth / distance))
    }, [distance, labels, tokens])

    // Throttle function prevent user multiple clicks
    const throttle = (cb, delay) => {
        return (...args) => {
            const now = new Date().getTime()
            if (now - last < delay) {
                return
            }
            setLast(now)
            return cb(...args)
        }
    }

    // Left arrow click function handler
    const handleLeftClick = (e) => {
        e.preventDefault()
        carousel.current.scrollLeft -= distance
        setScrollCounter(scrollCounter - 1)
        setTimeout(() => {
            setScrolled(carousel.current.scrollLeft)
        }, 500)
    }

    // Right arrow click function handler
    const handleRightClick = (e) => {
        e.preventDefault()
        carousel.current.scrollLeft += distance
        setScrollCounter(scrollCounter + 1)
        setTimeout(() => {
            setScrolled(carousel.current.scrollLeft)
        }, 500)
    }

    // Labels setting
    React.useEffect(() => {
        setBarLeft(`${.9 * scrollCounter}rem`)
    }, [scrollCounter, tokens])

    let points = []
    for (let i = 0; i < labels; i++) {
        points.push(<div className={styles.carousel__labels__point} key={i}></div>)
    }

    // Cards

    const config = {
        method: 'post',
        headers: {
            'X-Parse-Application-Id': 'mpxuNMEJnSlytSS75jhHdt4O3bCpxgRr6glWHnKw',
            'X-Parse-REST-API-Key': 'Spj9NomBOJYsPp2Dh4QFfKjcKIDXOYUhqCONK7AH',
            'Content-Type': 'application/json'
        }
    }

    const handleTokens = async () => {
        await fetch('https://parseapi.back4app.com/functions/seeTokenPools', config)
            .then(resp => resp.json())
            .then(json => {
                setTokens(json.result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        handleTokens()
    })

    // JSX
    return (
        <div className={styles.carousel}>
            <div className={styles.carousel__counter}>
                <span className={styles.carousel__counter__text}>
                    Atualizando automaticamente em&nbsp;
                    <span>30</span>s
                </span>
            </div>
            {tokens.length === 0 && (
                <div className={styles.carousel__body} ref={carousel}>
                    <Skeleton />
                    <Skeleton />
                </div>
            )}
            {tokens.length > 0 && (
                <div className={styles.carousel__body} ref={carousel}>
                    {tokens.map(t => (
                        <CoinCard key={t.TokenSymbol} symbol={t.TokenSymbol} name={t.TokenName} price={t.price} />
                    ))}
                </div>
            )}
            <div className={styles.carousel__buttons}>
                <button
                    className={styles.carousel__buttons__left}
                    disabled={scrolled === 0 ? true : false}
                    onClick={throttle(handleLeftClick, 500)}>
                    <img src={Chevron} alt="Carousel arrow" />
                </button>
                <button
                    className={styles.carousel__buttons__right}
                    disabled={scrolled > totalScroll ? true : false}
                    onClick={throttle(handleRightClick, 500)}>
                    <img src={Chevron} alt="Carousel arrow" />
                </button>
            </div>
            <div className={styles.carousel__labels}>
                <div
                    style={{ 'left': barLeft }}
                    className={styles.carousel__labels__bar}
                    ref={bar}
                ></div>
                {points}
            </div>
        </div>
    )
}

export default Carousel