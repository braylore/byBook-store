export const getNumberOfPage = (totalCount: number, limit: number): number => {
  return Math.ceil(totalCount / limit);
};
