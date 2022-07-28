import { IProducts } from 'types/IProducts';

export const getUniqueCategories = (productsList: IProducts[]) => {
  return [...new Set([productsList.map(({ category }) => [...category])].flat(2))];
};
