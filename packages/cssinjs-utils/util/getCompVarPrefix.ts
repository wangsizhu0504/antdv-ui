function getCompVarPrefix(component: string, prefix?: string) {
  return `${[
    prefix,
    component.replace(/([A-Z]+)([A-Z][a-z]+)/g, '$1-$2').replace(/([a-z])([A-Z])/g, '$1-$2'),
  ]
    .filter(Boolean)
    .join('-')}`;
}

export default getCompVarPrefix;
