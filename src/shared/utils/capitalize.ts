export const capitalize = <T extends string | number>(
  value?: T | null
): string => {
  if (value === null || value === undefined) {
    return '';
  }
  const valueStr = value.toString();
  if (!valueStr.length) {
    return '';
  }

  return `${valueStr[0].toUpperCase()}${valueStr.slice(1).toLowerCase()}`;
};
