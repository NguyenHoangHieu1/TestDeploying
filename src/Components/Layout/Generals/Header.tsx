import { NavLink } from "react-router-dom"
import classes from "./Header.module.css"
import Button from "../../UI/Button"
import React, { useEffect, useState } from "react"
import props from "../../../Interfaces/Props"
import useApi from "../../../customHooks/useApi"
import { useAppDispatch, useAppSelector } from "../../../store"
import { authActions } from "../../../store/auth"
import useMessage from "../../../customHooks/useMessage"

const Header: React.FC<props> = (props) => {
  const message = useMessage()
  const dispatch = useAppDispatch()
  const isAdmin = useAppSelector((state) => state.auth).userIsAdmin
  const [changeHeaderBar, setChangeHeaderBar] = useState(`${classes.header} `)
  const userId = useAppSelector((state) => state.auth).userId
  const [menuMobile, setMenuMobile] = useState(false)
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY >= 100) {
        setChangeHeaderBar(`${classes.header} ${classes.changed}`)
      } else {
        setChangeHeaderBar(`${classes.header}`)
      }
    })
  }, [window.scrollY])
  function changeMenuMobileHandler() {
    setMenuMobile((prevState) => {
      return !prevState
    })
  }
  function logOutHandler() {
    message({ title: "Logout Successfully", status: "success" })
    dispatch(authActions.clearAuth({}))
  }
  return (
    <header className={changeHeaderBar}>
      <div className={classes.headerContent}>
        <div className={classes.title}>
          <i className="fa-brands fa-shopify"></i>
          <h1>Shopify</h1>
        </div>
        <div
          onClick={changeMenuMobileHandler}
          className={classes["menu-mobile-bar"]}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
        <nav className={menuMobile ? classes["menu-mobile"] : classes.menu}>
          <ul className={classes.list}>
            <NavLink
              to="/"
              exact
              className={classes.item}
              activeClassName={classes.itemActive}
            >
              Home
            </NavLink>
            <NavLink
              to="/products/?page=1"
              className={classes.item}
              activeClassName={classes.itemActive}
            >
              Products
            </NavLink>
            {props.token && (
              <>
                <NavLink
                  to="/cart"
                  className={classes.item}
                  activeClassName={classes.itemActive}
                >
                  Cart
                </NavLink>
                <NavLink
                  to="/order"
                  className={classes.item}
                  activeClassName={classes.itemActive}
                >
                  Orders
                </NavLink>
                {isAdmin === "1" && [
                  <NavLink
                    key="1"
                    to="/add-product"
                    className={classes.item}
                    activeClassName={classes.itemActive}
                  >
                    Add Product
                  </NavLink>,
                  <NavLink
                    key="2"
                    to={`/your-products/${userId}`}
                    className={classes.item}
                    activeClassName={classes.itemActive}
                  >
                    Your Products
                  </NavLink>,
                ]}
              </>
            )}
          </ul>
        </nav>

        <div className={classes.buttons}>
          {!props.token ? (
            <>
              <Button onClick={props.onShowAuth?.bind(null, true)}>
                Login
              </Button>
              <Button onClick={props.onShowAuth?.bind(null, false)}>
                Signup
              </Button>
            </>
          ) : (
            <Button onClick={logOutHandler}>Log out</Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default React.memo(Header)
