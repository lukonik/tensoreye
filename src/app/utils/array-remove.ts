export function arrayRemove<T>(
  arr: Array<T>,
  deletePred: (item: T) => boolean
) {
  return arr.filter((item) => !deletePred(item));
}
