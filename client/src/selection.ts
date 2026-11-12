export function toggleSelection<T>(selected: readonly T[], value: T): T[] {
  return selected.includes(value)
    ? selected.filter((item) => item !== value)
    : [...selected, value];
}

export function isExactSelection<T>(
  selected: readonly T[],
  expected: readonly T[],
): boolean {
  return (
    selected.length === expected.length &&
    new Set(selected).size === selected.length &&
    expected.every((value) => selected.includes(value))
  );
}
