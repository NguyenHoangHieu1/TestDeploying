import { PropsWithChildren, useEffect, useState } from "react"
import Card from "../../UI/Card"
import classes from "./Features.module.css"
import phoneImage from "../../../images/phone.png"
const Features: React.FC<PropsWithChildren> = (props) => {
  const [buzz, setBuzz] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      console.log("Hi")
      setBuzz(!buzz)
    }, 3000 * (Math.random() + 1))
  }, [buzz])
  return (
    <Card>
      <main className={`${classes.main} `}>
        <h1 className={classes.title}>Our features!</h1>
        <ul className={classes.list}>
          <li className={classes.item}>
            <div className={classes.info}>
              <h1>Detect Earthquake</h1>
              <p>
                All smartphones come with tiny accelerometers that can sense
                signals that indicate an earthquake might be happening. If the
                phone detects something that it thinks may be an earthquake, it
                sends a signal to our earthquake detection server, along with a
                coarse location of where the shaking occurred. The server then
                combines information from many phones to figure out if an
                earthquake is happening. We’re essentially racing the speed of
                light (which is roughly the speed at which signals from a phone
                travel) against the speed of an earthquake. And lucky for us,
                the speed of light is much faster!
              </p>
            </div>
            <div className={` ${classes.img} ${classes.phonePlaceHolder} `}>
              <div className={`${buzz ? classes.buzz : ""}`}>
                <img src={phoneImage} alt="" />
                <p>{buzz ? "EARTHQUAKE" : "Nothing Happens"}</p>
              </div>
            </div>
          </li>
          <li className={classes.item}>
            <div className={`${classes.ecosia} ${classes.img}`}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Ecosia_logo.svg/800px-Ecosia_logo.svg.png"
                alt=""
              />
            </div>
            <div className={classes.info}>
              <h1>Help Protecting mother nature</h1>
              <p>
                Ecosia is a search engine based in Berlin, Germany. Ecosia
                considers itself a social business, claiming to be CO₂-negative,
                supports full financial transparency and protects the privacy of
                its users
              </p>
            </div>
          </li>
          <li className={classes.item}>
            <div className={classes.info}>
              <h1>Phone is made out of nature!</h1>
              <p>
                To protect the enviroment, We decided to make the phone out of
                beans to make it clean to the world and still strong enough to
                protect the phone.
              </p>
              <p>
                It is as strong as normal phonecase So it's a good choice for
                us.
              </p>
            </div>
            <div className={`${classes.img}`}>
              <img
                src="https://global-uploads.webflow.com/619d25c077e47a7a3a1f4d3c/61c0b35db25a7ebf3c8f7dfd_LUPIN-BEANS_Better-Nature_Shelley-Pauls.jpg"
                alt=""
              />
            </div>
          </li>
        </ul>
      </main>
    </Card>
  )
}

export default Features
