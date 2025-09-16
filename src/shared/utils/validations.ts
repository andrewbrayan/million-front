export const isNumber = (value: string) => {
  const regex = /^\d+$/;
  return regex.test(value);
};

export const hasLength = (
  value: string | number | Array<any>,
  length: number
) => {
  if (Array.isArray(value)) return value.length === length;
  return String(value).length === length;
};
