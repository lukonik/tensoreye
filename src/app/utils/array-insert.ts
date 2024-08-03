export function arrayInsert<T>(array: T[], index: number, element: T): T[] {
  const array_ = [...array];
  if (index < 0 || index > array.length) {
    throw new Error('Index out of bounds');
  }
  array_.splice(index, 0, element);
  return array_;
}
