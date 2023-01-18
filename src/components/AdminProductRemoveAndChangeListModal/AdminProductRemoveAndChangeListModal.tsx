import {
  Box,
  Modal,
  ModalProps,
  Pagination,
  Paper,
  styled,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { fetchAllProducts, productRemoveById } from 'store/slices/productsSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import AdminRemoveAndChangeList from 'components/AdminProductRemoveAndChangeList/AdminProductRemoveAndChangeList';
import { getNumberOfPage } from 'utils/getNumberOfPage';
import { getSlicedEntities } from 'utils/getSlicedEntities';
import { IProducts } from 'types/IProducts';
import { useDidMountEffect } from 'hooks/useDidMountEffect';
import { useHttp } from 'hooks/useHttp';
import { useColorMode } from 'hooks/useColorMode';
import { basketItemAdminRemove } from 'store/slices/basketSlice';
import { notify } from 'utils/notify';
import { baseUrlProducts } from 'constants/baseUrls';

const StyledModal = styled((props: ModalProps) => <Modal {...props} />)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

interface IAdminProductRemoveAndChangeListModalProps {
  open: boolean;
  handleClick: () => void;
}

const AdminProductRemoveAndChangeListModal: FC<IAdminProductRemoveAndChangeListModalProps> = ({
  open,
  handleClick
}) => {
  const dispatch = useAppDispatch();
  const { isProductListLoading, productListError, productsList } = useAppSelector((state) => state.productsReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const { request } = useHttp();
  const { mode } = useColorMode();
  const [isRemoveLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    if (open) {
      dispatch(fetchAllProducts());
    }
  }, [open]);

  useDidMountEffect(() => {
    setCurrentPage(1);
  }, [query]);

  if (productListError) {
    return (
      <StyledModal
        open={open}
        onClose={handleClick}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center'
          }}
        >
          Произошла ошибка. Пожалуйста перезагрузите страницу.
        </Typography>
      </StyledModal>
    );
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleChangePage = (e: ChangeEvent<unknown>, page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const searchProducts = (products: IProducts[], searchQuery: string) => {
    return products.filter((p) => p.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
  };
  const foundProducts = searchProducts(productsList, query);
  const slicedProductsList = getSlicedEntities(5, currentPage, foundProducts);
  const totalPages = getNumberOfPage(foundProducts.length, 5);

  const handleRemoveClick = async (id: string) => {
    try {
      setRemoveLoading(true);
      await request(`${baseUrlProducts}/${id}`, 'DELETE');
      if (slicedProductsList.length === 1 && currentPage !== 1) {
        setCurrentPage(totalPages - 1);
      }
      dispatch(basketItemAdminRemove(id));
      dispatch(productRemoveById(id));
      notify('success', 'Продукт был успешно удалён', mode);
    } catch {
      notify('error', 'Произошла ошибка при удалении продутка', mode);
    } finally {
      setRemoveLoading(false);
    }
  };

  const renderMessage = () => {
    if (productsList.length === 0) {
      return (
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center'
          }}
        >
          Товары отсутствуют
        </Typography>
      );
    }
    return (
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center'
        }}
      >
        По вашему запросу ничего не найдено
      </Typography>
    );
  };

  const message = renderMessage();

  return (
    <StyledModal
      open={open}
      onClose={handleClick}
    >
      <Paper
        sx={{
          width: '95%',
          border: '2px solid #000',
          borderRadius: '10px'
        }}
        elevation={24}
      >
        <Typography
          variant="h6"
          sx={{
            p: 1,
            textAlign: 'center'
          }}
        >
          Удалить/Изменить товар
        </Typography>
        {isProductListLoading ? (
          <Box
            sx={{
              minHeight: '395px'
            }}
          >
            <Box
              sx={{
                mt: '1rem',
                textAlign: 'center'
              }}
            >
              <CircularProgress />
            </Box>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                p: 1,
                borderTop: '1px solid #000',
                borderBottom: '1px solid #000'
              }}
            >
              <TextField
                autoComplete="off"
                type="search"
                value={query}
                onChange={handleSearchChange}
                fullWidth
                placeholder="Введите название товара"
                label="Поиск"
                variant="filled"
              />
            </Box>
            <Box
              sx={{
                p: 1,
                borderBottom: '1px solid #000',
                minHeight: '290px'
              }}
            >
              {slicedProductsList.length ? (
                <AdminRemoveAndChangeList
                  isDisabled={isRemoveLoading}
                  handleRemoveClick={handleRemoveClick}
                  productsList={slicedProductsList}
                />
              ) : (
                message
              )}
            </Box>
            <Box
              sx={{
                p: 1
              }}
            >
              <Pagination
                variant="outlined"
                shape="rounded"
                page={currentPage}
                count={totalPages}
                onChange={handleChangePage}
              />
            </Box>
          </>
        )}
      </Paper>
    </StyledModal>
  );
};

export default AdminProductRemoveAndChangeListModal;
