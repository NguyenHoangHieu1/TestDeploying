import props from "../../../Interfaces/Props";
import Card from "../../UI/Card";
import classes from "./Description.module.css";

const Description: React.FC<props> = (props) => {
  return (
    <Card>
      <section id="Description" className={classes.description}>
        <div className={classes.title}>
          <h1>Welcome</h1>
        </div>
        <div className={classes.paragraph}>
          This website is created just to show everyone how to make the planet
          greener when around our life are just technologies. But we have found
          a way to make using technologies greener by creating machines that can
          help human for everything but still be able to not damage the
          enviroment and are able to make our enviroment cleaner and fresher.
        </div>
        <div className={classes["benefit-list"]}>
          <ul className={classes.benefits}>
            <li className={classes.benefit}>
              <div className={classes.benefitIcon}>
                <i className="fa-solid fa-recycle"></i>
              </div>
              <div className={classes.benefitDescription}>
                <b>Recyclable</b>
                <p>
                  our technologies can be Recyclable because of out materials
                  are not harmful.
                </p>
              </div>
            </li>
            <li className={classes.benefit}>
              <div className={classes.benefitIcon}>
                <i className="fa-solid fa-bolt-lightning"></i>
              </div>
              <div className={classes.benefitDescription}>
                <b>Speed</b>
                <p>
                  our technologies can run faster than most technologies in the
                  world by using a technology called nano.
                </p>
              </div>
            </li>
            <li className={classes.benefit}>
              <div className={classes.benefitIcon}>
                <i className="fa-solid fa-seedling"></i>
              </div>
              <div className={classes.benefitDescription}>
                <b>Enviroment Friendly</b>
                <p>
                  Our technologies use at little as possible energy to not
                  pollute the enviroment
                </p>
              </div>
            </li>
            <li className={classes.benefit}>
              <div className={classes.benefitIcon}>
                <i className="fa-solid fa-house"></i>
              </div>
              <div className={classes.benefitDescription}>
                <b>Human Friendly</b>
                <p>
                  You can use our Technologies with ease because They are very
                  to use.
                </p>
              </div>
            </li>
            <li className={classes.benefit}>
              <div className={classes.benefitIcon}>
                <i className="fa-solid fa-money-bill"></i>
              </div>
              <div className={classes.benefitDescription}>
                <b>Cheap Price</b>
                <p>
                  Even though Our technologies are unique, We don't sell it for
                  money. Our mission is to protect the earth
                </p>
              </div>
            </li>
            <li className={classes.benefit}>
              <div className={classes.benefitIcon}>
                <i className="fa-solid fa-hand-fist"></i>
              </div>
              <div className={classes.benefitDescription}>
                <b>Strength</b>
                <p>
                  Our technologies can be as powerful as ever because we let the
                  user to be able to customize it to their needs.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </Card>
  );
};

export default Description;
