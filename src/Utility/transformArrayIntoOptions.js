const transformArrayIntoOptions = function (list, keys) {
  return (list || []).filter(item => item).map(item => ({value: item[keys.value], label: item[keys.label], object: item}))
}

export default transformArrayIntoOptions