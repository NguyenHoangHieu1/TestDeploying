import props from "../../../../Interfaces/Props"
import Button from "../../../UI/Button"
import Card from "../../../UI/Card"
import InputContainer from "../../../UI/InputContainer"
import classes from "./Auth.module.css"
import useUserInput from "../../../../customHooks/useUserInput"
import React, { useState, useEffect, ReactNode } from "react"
import ModalBackdrop from "../../../UI/ModalBackdrop"

import { authActions } from "../../../../store/auth"
import { useAppDispatch, useAppSelector } from "../../../../store"
import useApi from "../../../../customHooks/useApi"
import { Response } from "../../../../Interfaces/Response"
import { Route } from "react-router"
import { Link } from "react-router-dom"
const Login: React.FC<props> = (props) => {
  const dispatch = useAppDispatch()
  const {
    valueInput: emailInput,
    inValid: emailInvalid,
    isValid: emailIsValid,
    onChange: emailChange,
    onFocus: emailFocus,
    reset: emailReset,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true
      }
      return false
    } else {
      return value > 0
    }
  })
  const {
    valueInput: passwordInput,
    inValid: passwordInvalid,
    isValid: passwordIsValid,
    onChange: passwordChange,
    onFocus: passwordFocus,
    reset: passwordReset,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      return value.length > 5
    } else {
      return value > 0
    }
  })
  const apiHook = useApi()

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    apiHook(import.meta.env.VITE_API_POST_LOGIN, {
      method: "POST",
      body: {
        email: emailInput,
        password: passwordInput,
      },
      headers: {
        "Content-Type": "application/json",
      },
      useData: (data) => {
        console.log(data)
        if (data.token && data.userId) {
          localStorage.setItem("token", data.token)
          localStorage.setItem("userId", data.userId)
          localStorage.setItem("userIsAdmin", "" + data.userIsAdmin)
          dispatch(
            authActions.setAuth({
              token: data.token,
              userId: data.userId,
              userIsAdmin: data.userIsAdmin,
            })
          )
        }
        return data
      },
    }).then((data: Response | void) => {
      if (data) {
        if (data.token && data.token.length <= 0) {
          return
        }
        props.onHideAuth!(true)
      }
    })
  }

  const emailClassName = emailInvalid ? true : false
  const passwordClassName = passwordInvalid ? true : false
  return (
    <section className={classes.login}>
      <ModalBackdrop onHideAuth={props.onHideAuth?.bind(null, true)}>
        <header className={classes.titleAuth}> Login </header>
        <form onSubmit={submitHandler} className={classes.formAuth}>
          <InputContainer
            title="email"
            inputValues={{
              inputValue: emailInput,
              inputChange: emailChange,
              inputFocus: emailFocus,
              inputOnClassName: emailClassName,
              type: "text",
            }}
          />
          <InputContainer
            title="Password"
            inputValues={{
              inputValue: passwordInput,
              inputChange: passwordChange,
              inputFocus: passwordFocus,
              inputOnClassName: passwordClassName,
              type: "password",
            }}
          />
          <Button>Login</Button>
          <Link to="/forgot-password">Forgot your password ?</Link>
        </form>
      </ModalBackdrop>
    </section>
  )
}
export default Login
