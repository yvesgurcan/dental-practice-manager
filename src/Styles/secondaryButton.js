export const secondaryButton = {
  background: "white",
  color: "steelblue",
  border: "1px solid lightgray",
  cursor: "pointer",
  marginRight: 5,
  marginBottom: 5,
  padding: 7,
}

export const secondaryButtonDisabled = {
  ...secondaryButton,
  color: "lightgray",
  cursor: "not-allowed",
}

export const secondaryButtonHover = {
  ...secondaryButton,
  color: "darkblue",
}

export const secondaryButtonClick = {
  ...secondaryButton,
  color: "dodgerblue",
}

export default secondaryButton