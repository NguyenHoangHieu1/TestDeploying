import React from "react"
import Button from "../../UI/Button"
import classes from "./Form.module.css"
import useUserInput from "../../../customHooks/useUserInput"
import props from "../../../Interfaces/Props"
import InputContainer from "../../UI/InputContainer"
import useApi from "../../../customHooks/useApi"
const Form: React.FC<props> = (props) => {
  const apiHook = useApi()
  const {
    valueInput: nameInput,
    reset: nameReset,
    inValid: nameInvalid,
    onChange: nameChange,
    onFocus: nameFocus,
    isValid: nameIsValid,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      return value.length > 5
    } else {
      return value > 0
    }
  })
  const {
    valueInput: reasonInput,
    reset: reasonReset,
    inValid: reasonInvalid,
    onChange: reasonChange,
    onFocus: reasonFocus,
    isValid: reasonIsValid,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      return value.length > 5
    } else {
      return value > 0
    }
  })
  const {
    valueInput: emailInput,
    reset: emailReset,
    inValid: emailInvalid,
    onChange: emailChange,
    onFocus: emailFocus,
    isValid: emailIsValid,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      return value.length > 5
    } else {
      return value > 0
    }
  })
  let formIsValid = nameIsValid && reasonIsValid && emailIsValid

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()

    if (!formIsValid) {
    } else {
      nameReset()
      reasonReset()
      emailReset()
    }
    apiHook(import.meta.env.VITE_API_POST_CONTACT, {
      method: "POST",
      body: {
        name: nameInput,
        message: reasonInput,
        email: emailInput,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  let nameClasses = nameInvalid ? true : false
  let reasonClasses = reasonInvalid ? true : false
  let emailClasses = emailInvalid ? true : false

  return (
    <section className={classes.contact}>
      <div className={classes.title}>
        <h1>Contact Us!</h1>
      </div>
      <div className={classes.formInput}>
        <div className="reasons">
          <h1>
            If you have any question
            <br /> or want to work with us, please fill out
            <br />
            the form with how many the <br />
            reasons are so that we can work together
          </h1>
          {/* <ol type="1">
            <li></li>
            <li>We always sell food with low price</li>
            <li>All goods for low price</li>
          </ol> */}
        </div>
        <form onSubmit={submitHandler} className={classes.form}>
          <InputContainer
            title="Name"
            inputValues={{
              inputValue: nameInput,
              inputChange: nameChange,
              inputFocus: nameFocus,
              inputOnClassName: nameClasses,
              type: "text",
            }}
          ></InputContainer>

          <InputContainer
            title="Email"
            inputValues={{
              inputValue: emailInput,
              inputChange: emailChange,
              inputFocus: emailFocus,
              type: "text",
              inputOnClassName: emailClasses,
            }}
          ></InputContainer>
          <InputContainer
            title="Reason"
            inputValues={{
              inputValue: reasonInput,
              inputChange: reasonChange,
              inputFocus: reasonFocus,
              type: "text",
              inputOnClassName: reasonClasses,
            }}
          ></InputContainer>
          <Button>Send!</Button>
        </form>
      </div>
    </section>
  )
}

export default Form
