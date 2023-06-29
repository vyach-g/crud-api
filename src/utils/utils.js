export function isUUID(str) {
  const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return pattern.test(str);
}

export function getSplittedPath(path) {
  return path.split('/').filter((part) => part !== '');
}
