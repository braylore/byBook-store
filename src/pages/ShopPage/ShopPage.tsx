import ProductsList from 'components/ShopList/ShopList';
import { ChangeEvent, useEffect } from 'react';
import { fetchAllProducts } from 'store/slices/productsSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Grid, Paper, CircularProgress, Box, styled, Typography } from '@mui/material';
import { getNumberOfPage } from 'utils/getNumberOfPage';
import { getSlicedEntities } from 'utils/getSlicedEntities';
import { useSearchParams } from 'react-router-dom';
import SearchForm from 'components/ShopSearchForm/ShopSearchForm';
import { useSearchedFilteredAndSortedProducts } from 'hooks/useProducts';

const ErrorMsg = styled(Typography)({
  marginTop: '1rem',
  textAlign: 'center',
  fontWeight: 'bold'
});

const ShopPage = () => {
  const dispatch = useAppDispatch();
  const { productListError, isProductListLoading, productsList } = useAppSelector((state) => state.productsReducer);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const currentPageParams = searchParams.get('page') || '1';
  const categoriesParams = searchParams.get('categories') || '';
  const searchQueryParams = searchParams.get('searchQuery') || '';
  const searchSelectParams = searchParams.get('searchSelect') || 'all';
  const sortSelectParams = searchParams.get('sortSelect') || 'none';

  const handleChangePage = (e: ChangeEvent<unknown>, page: number) => {
    if (+currentPageParams !== page) {
      window.scrollTo({ top: 0, left: 0 });
    }
    if (page === 1) {
      searchParams.delete('page');
      setSearchParams(searchParams);
      return;
    }
    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);
  };

  const handleSearchFormSubmit = (
    checkboxState: string[],
    searchQueryState: string,
    searchSelectState: string,
    sortSelectState: string
  ) => {
    if (
      searchQueryState === searchQueryParams &&
      searchSelectState === searchSelectParams &&
      checkboxState.join(',') === categoriesParams &&
      sortSelectState === sortSelectParams
    ) {
      return;
    }

    if (sortSelectState === 'none') {
      searchParams.delete('sortSelect');
    } else {
      searchParams.set('sortSelect', sortSelectState);
    }

    if (!checkboxState.length) {
      searchParams.delete('categories');
    } else {
      searchParams.set('categories', checkboxState.join(','));
    }

    if (!searchQueryState.length) {
      searchParams.delete('searchQuery');
    } else {
      searchParams.set('searchQuery', searchQueryState);
    }

    if (searchSelectState === 'all') {
      searchParams.delete('searchSelect');
    } else {
      searchParams.set('searchSelect', searchSelectState);
    }

    if (searchParams.has('page')) {
      searchParams.delete('page');
    }
    setSearchParams(searchParams);
  };

  const processingProductsList = useSearchedFilteredAndSortedProducts(
    productsList,
    searchSelectParams,
    searchQueryParams,
    categoriesParams,
    sortSelectParams
  );

  if (isProductListLoading) {
    return (
      <Box
        sx={{
          mt: '1rem',
          textAlign: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (productListError) {
    return <ErrorMsg variant="h5">{productListError}</ErrorMsg>;
  }

  const slicedProductsList = getSlicedEntities(6, +currentPageParams, processingProductsList);
  const totalPages = getNumberOfPage(processingProductsList.length, 6);

  return (
    <div>
      {productsList.length && (
        <Grid
          sx={{
            mt: '10px'
          }}
          container
          spacing={1}
          justifyContent="center"
        >
          <Grid
            md={4}
            xs={12}
            item
          >
            <Paper
              sx={{
                p: 2
              }}
              elevation={4}
            >
              <SearchForm
                sortSelectParams={sortSelectParams}
                searchQueryParams={searchQueryParams}
                searchSelectParams={searchSelectParams}
                categoriesParams={categoriesParams ? categoriesParams.split(',') : []}
                handleSearchFormSubmit={handleSearchFormSubmit}
              />
            </Paper>
          </Grid>
          <ProductsList
            currentPage={+currentPageParams}
            handleChangePage={handleChangePage}
            totalPages={totalPages}
            productsList={slicedProductsList}
          />
        </Grid>
      )}
    </div>
  );
};

export default ShopPage;
