const transformArrayIntoOptions = function (list, keys) {
  return (list || []).map(item => ({value: item[keys.value], label: item[keys.label], object: item}))
}

export default transformArrayIntoOptions