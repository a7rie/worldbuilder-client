import LoginForm from "./LoginForm"
import { useState } from "react"
import RedAlert from "../../common/RedAlert"

export default function LoginPage() {
  const style = {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
  }

  const [alertMessage, setAlertMessage] = useState("")
  return (
    <div>
      <RedAlert alertMessage={alertMessage} />
      <div style={style}>
        <LoginForm setAlertMessage={setAlertMessage} />
      </div>
    </div>
  )
}