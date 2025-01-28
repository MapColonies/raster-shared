export function pickEnum<T extends { [k: string]: string }, K extends keyof T>(enumObj: T, keys: K[]): Pick<T, K> {
  const picked = {} as Pick<T, K>;
  keys.forEach((key) => {
    picked[key] = enumObj[key];
  });
  return picked;
}
