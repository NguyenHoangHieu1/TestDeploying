import props from "../../Interfaces/Props";
import classes from "./Link.module.css";
const Link: React.FC<props> = (props) => {
  return (
    <a className={classes.link} href={props.link}>
      {props.children}
    </a>
  );
};

export default Link;
