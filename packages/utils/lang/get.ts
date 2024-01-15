export function get(entity: any, path: Array<string | number>) {
  let current = entity

  for (let i = 0; i < path.length; i += 1) {
    if (current === null || current === undefined)
      return undefined

    current = current[path[i]]
  }

  return current
}
