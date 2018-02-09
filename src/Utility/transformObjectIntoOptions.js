const transformObjectIntoOptions = function (object, keys) {
  return Object.keys(object).map(key => object[key]).filter(item => item).map(item => ({value: item[keys.value], label: item[keys.label], object: item}))
}

export default transformObjectIntoOptions