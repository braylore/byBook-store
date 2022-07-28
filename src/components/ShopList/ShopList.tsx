import { Grid, styled, Pagination, PaginationProps } from '@mui/material';
import ShopListItem from 'components/ShopListItem/ShopListItem';
import { ChangeEvent, FC } from 'react';
import { IProducts } from 'types/IProducts';

const StyledPagination = styled((props: PaginationProps) => (
  <Pagination
    variant="outlined"
    shape="rounded"
    {...props}
  />
))({
  marginTop: '10px'
});

interface IShopListProps {
  productsList: IProducts[];
  totalPages: number;
  currentPage: number;
  handleChangePage: (e: ChangeEvent<unknown>, page: number) => void;
}

const ShopList: FC<IShopListProps> = ({ productsList, handleChangePage, currentPage, totalPages }) => {
  return (
    <Grid
      md={8}
      item
      container
      spacing={2}
      sx={{
        justifyContent: 'center'
      }}
    >
      {productsList.length ? (
        <>
          {productsList.map((p) => (
            <ShopListItem
              key={p.title}
              {...p}
            />
          ))}
          <Grid
            item
            xs={12}
            md={12}
          >
            <StyledPagination
              page={currentPage}
              count={totalPages}
              onChange={handleChangePage}
            />
          </Grid>
        </>
      ) : (
        <h2>По вашему запросу ничего не найдено</h2>
      )}
    </Grid>
  );
};

export default ShopList;
