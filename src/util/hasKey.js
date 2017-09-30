const hasKey = (object, targetKey) => {
  if (object.length === 0) {
    return false
  }

  const keys = Object.keys(object)

  if (keys.includes(targetKey)) {
    return true
  }

  const children = keys.reduce((objects, key) => {
    if (typeof object[key] === 'object') {
      objects.push(object[key])
    }
    return objects
  }, [])

  for (const child of children) {
    if (hasKey(child, targetKey)) {
      return true
    }
  }

  return false
}

export default hasKey
