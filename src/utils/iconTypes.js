
const iconTypes = {
  directory: 'IconFolder',
  file: 'IconFile',
  link: 'IconLink',
}

export default function getIcon(type) {
  return iconTypes[type];
}