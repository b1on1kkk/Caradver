export function CheckAllValidity(values: boolean[]) {
  for (let i = 0; i < values.length; i++) {
    if (values[i]) return false;
  }

  return true;
}
