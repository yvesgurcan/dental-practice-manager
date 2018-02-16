export const dangerButton = {
  background: "red",
  color: "white",
  border: "1px solid lightgray",
  cursor: "pointer",
  marginRight: 5,
  marginBottom: 5,
  padding: 7,
}

export const dangerButtonDisabled = {
  ...dangerButton,
  background: "tomato",
  color: "lightgray",
  cursor: "not-allowed",
}

export const dangerButtonHover = {
  ...dangerButton,
  background: "orangered",
}

export const dangerButtonClick = {
  ...dangerButton,
  background: "coral",
}

export default dangerButton