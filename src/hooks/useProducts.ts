import { useMemo } from 'react';
import { IProducts } from 'types/IProducts';

export const useSearchedProducts = (products: IProducts[], searchType: string, searchQuery: string) => {
  const searchedProducts = useMemo(() => {
    switch (searchType) {
      case 'title': {
        return products.filter((p) => p.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
      }
      case 'author': {
        return products.filter((p) => p.author.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
      }
      default:
        return products.filter(
          (p) =>
            p.author.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
            p.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
        );
    }
  }, [products, searchType, searchQuery]);
  return searchedProducts;
};

export const useSearchedAndFilteredProducts = (
  products: IProducts[],
  searchType: string,
  searchQuery: string,
  categories: string
) => {
  const categoriesArr = categories.split(',');
  const searchedProducts = useSearchedProducts(products, searchType, searchQuery);
  const searchedAndFilteredProcuts = useMemo(() => {
    if (!categories) {
      return searchedProducts;
    }
    return searchedProducts.filter((p) => {
      if (p.category.length < categoriesArr.length) {
        return false;
      }
      return [...new Set([...p.category, ...categoriesArr])].length === p.category.length;
    });
  }, [categories, searchedProducts]);

  return searchedAndFilteredProcuts;
};

export const useSearchedFilteredAndSortedProducts = (
  products: IProducts[],
  searchType: string,
  searchQuery: string,
  categories: string,
  sortType: string
) => {
  const searchedAndFilteredProducts = useSearchedAndFilteredProducts(products, searchType, searchQuery, categories);
  const searchedFilteredAndSortedProducts = useMemo(() => {
    switch (sortType) {
      case 'cheap':
        return [...searchedAndFilteredProducts].sort((a, b) => {
          if (a.price > b.price) {
            return 1;
          }
          if (a.price < b.price) {
            return -1;
          }
          return 0;
        });
      case 'expensive':
        return [...searchedAndFilteredProducts].sort((a, b) => {
          if (a.price > b.price) {
            return -1;
          }
          if (a.price < b.price) {
            return 1;
          }
          return 0;
        });
      default:
        return [...searchedAndFilteredProducts];
    }
  }, [sortType, searchedAndFilteredProducts]);
  return searchedFilteredAndSortedProducts;
};
