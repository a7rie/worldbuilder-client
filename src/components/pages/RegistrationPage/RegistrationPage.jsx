import { useState } from "react"
import RedAlert from "../../common/RedAlert"
import RegistrationForm from "./RegistrationForm"

export default function RegistrationPage() {
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
        <RegistrationForm setAlertMessage={setAlertMessage} />
      </div>
    </div>
  )
}