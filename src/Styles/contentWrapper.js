const gap = 20
const menuWidth = 150

const contentWrapper = {
  display: "grid",
  gridTemplateColumns: `${menuWidth}px calc(100% - ${menuWidth}px - ${gap}px)`,
  gridColumnGap: gap,
}

export default contentWrapper