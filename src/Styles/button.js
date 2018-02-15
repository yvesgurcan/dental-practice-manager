export const button = {
  background: "steelblue",
  color: "white",
  border: "1px solid lightgray",
  cursor: "pointer",
  marginRight: 5,
  marginBottom: 5,
  padding: 7,
}

export const buttonDisabled = {
  ...button,
  background: "steelblue",
  color: "lightgray",
  cursor: "not-allowed",
}

export const buttonHover = {
  ...button,
  background: "royalblue",
}

export const buttonClick = {
  ...button,
  background: "dodgerblue",
}

export default button