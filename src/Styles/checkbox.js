import standardMargin from './standardMargin'

export const checkbox = {
  ...standardMargin,
  webkitAppearance: "none",
  border: "1px solid lightgray",
  height: 11,
  width: 11,
  margin: "auto",
  marginRight: 3,
  background: "#eee",
}

export const checkboxChecked = {
  ...checkbox,
  background: "gray",
}

export default checkbox