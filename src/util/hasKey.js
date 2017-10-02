// hasKey() checks if the supplied object contains the
// target key. The key may be nested under many layers.
// The below algorithm utilizses a recursive depth-frist
// search algorthm to conduct a deep object search.

const hasKey = (object, targetKey) => {
  // Base Condition
  if (object.length === 0) {
    return false
  }

  const keys = Object.keys(object)

  // If the keys array include the targetKey,
  // terminate immediately, and return true
  if (keys.includes(targetKey)) {
    return true
  }

  // The inner function check if the value is an
  // object, and if so, push it to the accumulator
  const children = keys.reduce((objects, key) => {
    if (typeof object[key] === 'object') {
      objects.push(object[key])
    }
    return objects
  }, [])

  // Recursively call hasKey on each child.  If one of the
  // calls returns true, the result returns to the next call
  // stack until it sinks all the way down to the original call.
  for (const child of children) {
    if (hasKey(child, targetKey)) {
      return true
    }
  }

  // If no element in the for..of loop triggered a return, then
  // that means the key was not found.  Return false.
  return false
}

export default hasKey
