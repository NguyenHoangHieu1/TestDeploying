import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
  Suspense,
} from "react"
const Footer = React.lazy(() => import("./Components/Layout/Generals/Footer"))
const Header = React.lazy(() => import("./Components/Layout/Generals/Header"))
const Contact = React.lazy(() => import("./Components/Layout/Home/Contact"))
const Intro = React.lazy(() => import("./Components/Layout/Home/Intro"))
const MainContent = React.lazy(
  () => import("./Components/Layout/Generals/MainContent")
)
const TopPage = React.lazy(() => import("./Components/UI/TopPage"))
const ProductsLayout = React.lazy(
  () => import("./Components/Layout/Home/ProductsHome")
)
const ProductsPage = React.lazy(
  () => import("./Components/Layout/Products/ProductsPage")
)
const ProductDetail = React.lazy(
  () => import("./Components/Layout/Product-Detail/ProductDetail")
)
const Cart = React.lazy(() => import("./Components/Layout/Cart/Cart"))
import { Switch, Route, Redirect } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./store/index"
const Order = React.lazy(() => import("./Components/Layout/Orders/Order"))
const AddProduct = React.lazy(
  () => import("./Components/Layout/Add-Product/AddProduct")
)

import Login from "./Components/Layout/Authentication/Popup/Login"
import Signup from "./Components/Layout/Authentication/Popup/Signup"

import props from "./Interfaces/Props"
import { authActions } from "./store/auth"
import useApi from "./customHooks/useApi"
import { Response } from "./Interfaces/Response"
import ForgotPassword from "./Components/Layout/Authentication/Page/ForgotPassword"
import ChangePassword from "./Components/Layout/Authentication/Page/ChangePassword"
import YourProducts from "./Components/Layout/Your-Products/YourProducts"
import Product from "./Interfaces/Product"
import EditProduct from "./Components/Layout/Edit-Product/EditProduct"
import OrderPage from "./Components/Layout/Orders/OrderPage"
import Description from "./Components/Layout/Home/Description"
import Specs from "./Components/Layout/Home/Specs"
import Features from "./Components/Layout/Home/Features"
import Brand from "./Components/Layout/Home/Brand"
const UI = React.lazy(() => import("./Components/Layout/Generals/UI"))
const Activate = React.lazy(
  () => import("./Components/Layout/Authentication/Page/Activate")
)

const App: React.FC<props> = () => {
  const dispatch = useAppDispatch()
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)
  const isLoggedIn = useAppSelector((state) => state.auth).token
  const isAdmin = useAppSelector((state) => state.auth).userIsAdmin
  useEffect(() => {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const userIsAuth = localStorage.getItem("userIsAdmin")
    console.log(token, userId, userIsAuth)
    if (token && token.length > 0) {
      dispatch(
        authActions.setAuth({
          token: token,
          userId: userId,
          userIsAdmin: userIsAuth,
        })
      )
    }
  }, [isLoggedIn])

  const showAuth = useCallback((authVer?: boolean) => {
    if (authVer === true) {
      setLogin(true)
    } else {
      setSignup(true)
    }
  }, [])
  const hideAuth = useCallback((authVer?: boolean) => {
    if (authVer === true) {
      setLogin(false)
    } else {
      setSignup(false)
    }
  }, [])
  return (
    <Fragment>
      <Suspense
        fallback={
          <div className="loading">
            <p className="centered ">Loading...</p>
          </div>
        }
      >
        <Header token={isLoggedIn} onShowAuth={showAuth} />
        <UI />
        {login && <Login onHideAuth={hideAuth} />}
        {signup && <Signup onHideAuth={hideAuth} />}
        <MainContent>
          <Switch>
            <Route path="/" exact>
              <Intro />
              <Description />
              <Specs />
              <Features />
              <Brand />
              <ProductsLayout />
              <Contact />
            </Route>
            <Route path="/products" exact>
              <ProductsPage />
            </Route>
            <Route path="/products/:productId">
              <ProductDetail />
            </Route>
            {isLoggedIn && [
              <Route key="1" path="/cart">
                <Cart />
              </Route>,
              <Route key="2" path="/order">
                <OrderPage />
              </Route>,
            ]}
            {isLoggedIn &&
              isAdmin === "1" && [
                <Route key="4" path="/your-products/:userId/">
                  <YourProducts />
                </Route>,
                <Route key="3" path="/add-product">
                  <AddProduct />
                </Route>,
                <Route key="5" path="/edit-product/:productId">
                  <EditProduct />
                </Route>,
              ]}
            <Route path="/activate-password/:token">
              <Activate />
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="/change-password/:token">
              <ChangePassword />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </MainContent>

        <Footer />
        <TopPage />
      </Suspense>
    </Fragment>
  )
}

export default App
