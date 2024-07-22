import Alert from "react-bootstrap/Alert"

export default function RedAlert({ alertMessage }) {
  if (!alertMessage) {
    return
  }
  return (
    <Alert variant="danger">
      {alertMessage}
    </Alert>
  )
}
