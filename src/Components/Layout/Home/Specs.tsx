import { PropsWithChildren, useEffect, useState } from "react"
import Card from "../../UI/Card"
import classes from "./Specs.module.css"

const listOfImages = [
  "https://cdn.tgdd.vn/Products/Images/42/233135/realme-8-silver-600x600.jpg",
  "https://cdn.tgdd.vn/Products/Images/42/249427/xiaomi-11-lite-5g-ne-white-600x600.jpg",
]
const Specs: React.FC<PropsWithChildren> = (props) => {
  const [imageVisible, setImageVisible] = useState(0)
  const theImageTag = listOfImages.map((image, index) => {
    if (index == imageVisible) {
      return <img key={index} src={image} alt="" />
    }
  })
  useEffect(() => {
    let timeOutId = setTimeout(() => {
      if (imageVisible === listOfImages.length - 1) {
        setImageVisible(0)
      } else {
        setImageVisible(imageVisible + 1)
      }
    }, 3000)
    return () => {
      clearTimeout(timeOutId)
    }
  }, [imageVisible])
  return (
    <Card>
      <main className={classes.main}>
        <section className={classes.image}>{theImageTag}</section>
        <section className={classes.info}>
          <h1>Top Pick:</h1>
          <h3>Specifications</h3>
          <p>
            GoLua phones have a chip called cleverium, which has stability, and
            the configuration power of Snapdragon's Cortex processor core
            brings. Not only that, the plus point is the graphics ability with
            Adreno chip, Spectra image processing chip, and a number of other
            new technologies such as AI, with today's advanced AI, the fact that
            a phone can can understand us almost anything is possible.
          </p>
          <p>
            With 2k full hd screen plus 120hz screen, this Vietnamese phone will
            be a revolution for Vietnamese phone technology with the price of
            only 15 million VND. Although the price is quite expensive, compared
            to many competitors, the price is still too cheap. We're going to be
            the one to redefine prices on all fronts with this GoLua phone.
            Golua has a battery capacity of 4500 milliampere, which may not
            sound like enough for a day, but with advanced AI technology and a
            separate operating system from Android's Linux, MinOs OS will make
            your phone faster. see. But we also integrate a bit of android
            functionality so that MinOs can download and install Android apps.
            Expansion of Min's ecosystem.
          </p>
        </section>
      </main>
    </Card>
  )
}

export default Specs
