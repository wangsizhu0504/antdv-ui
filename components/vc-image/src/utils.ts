export const mergeDefaultValue = <T extends object>(obj: T, defaultValues: object): T => {
  const res = { ...obj }
  Object.keys(defaultValues).forEach((key) => {
    if (obj[key] === undefined)
      res[key] = defaultValues[key]
  })
  return res
}
