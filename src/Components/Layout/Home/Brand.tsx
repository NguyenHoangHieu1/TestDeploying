import { PropsWithChildren } from "react"
import Card from "../../UI/Card"
import classes from "./Brand.module.css"
import brand_1 from "../../../images/brand_1.png"
import brand_2 from "../../../images/brand_2.png"
import brand_3 from "../../../images/brand_3.png"
const Brand: React.FC<PropsWithChildren> = (props) => {
  return (
    <Card>
      <ul className={classes.brands}>
        <li className={classes.brand}></li>
        <li className={classes.brand}></li>
        <li className={classes.brand}>
          <img src={brand_3} alt="" />
        </li>
        <li className={classes.brand}></li>
        <li className={classes.brand}></li>
      </ul>
    </Card>
  )
}

export default Brand
