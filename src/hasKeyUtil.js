const hasKey = (object, targetKey) => {
  if (object.length === 0) {
    return false
  }

  const keys = Object.keys(object)

  if (keys.includes(targetKey)) {
    return true
  }

  const children = []

  keys.forEach(key => {
    if (typeof object[key] === 'object') {
      children.push(object[key])
    }
  })

  for (const child of children) {
    return hasKey(child, targetKey)
  }

  return false
}

export default hasKey
