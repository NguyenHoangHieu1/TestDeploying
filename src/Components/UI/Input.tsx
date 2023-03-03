import props from "../../Interfaces/Props"
import classes from "./Input.module.css"

const Input: React.FC<props> = (props) => {
  if (props.onClassName === true) {
    return (
      <input
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        className={`${classes.input} ${classes.invalid}`}
        type={props.type}
      />
    )
  } else {
    return (
      <input
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        className={`${classes.input}`}
        type={props.type}
      />
    )
  }
}

export default Input
