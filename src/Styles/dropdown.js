import standardMargin from './standardMargin'

export const dropdown = {
  ...standardMargin,
  WebkitAppearance: "none",
  border: "transparent",
}

export const dropdownDisabled = {
  ...dropdown,
  cursor: "not-allowed",
}

export default dropdown