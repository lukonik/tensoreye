export function arrayUpdate<T>(
  arr: Array<T>,
  updater: (obj: T) => T,
  matcher: number | ((obj: T) => boolean)
) {
  return arr.map((item, index) => {
    let matches = false;
    if (typeof matcher === 'number') {
      matches = index === matcher;
    } else if (typeof matcher === 'function') {
      matches = matcher(item);
    }

    if (matches) {
      return updater(item);
    }
    return item;
  });
}
