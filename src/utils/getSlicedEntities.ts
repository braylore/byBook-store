export const getSlicedEntities = <T>(range: number, currentPage: number, entities: T[]): T[] => {
  return entities.slice(range * currentPage - range, range * currentPage);
};
