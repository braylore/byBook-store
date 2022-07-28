export const cutLongString = (str: string) => {
  return str.length > 45 ? `${str.slice(0, 45)}...` : str;
};
