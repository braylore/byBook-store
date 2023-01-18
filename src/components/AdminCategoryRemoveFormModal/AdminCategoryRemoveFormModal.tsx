import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  MenuItem,
  Modal,
  Paper,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchAllCategories, categoriesRemoveById } from 'store/slices/categoriesSlice';
import { ValidationErrorMsg } from 'validation';
import { notify } from 'utils/notify';
import { useColorMode } from 'hooks/useColorMode';
import { fetchAllProducts } from 'store/slices/productsSlice';
import { getUniqueCategories } from 'utils/getUniqueCategories';
import { IAdminCategoryFormModalSubmit } from 'components/AdminCategoryAddFormModal/AdminCategoryAddFormModal';
import { useHttp } from 'hooks/useHttp';
import { baseUrlCategories } from 'constants/baseUrls';

const ErrorMsg = styled(Typography)({
  padding: '1rem',
  textAlign: 'center',
  fontWeight: 'bold'
});

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const StyledPaper = styled(Paper)({
  width: '95%',
  border: '2px solid #000',
  borderRadius: '10px'
});

const StyledBtn = styled((props: ButtonProps) => (
  <Button
    color="inherit"
    variant="outlined"
    type="submit"
    {...props}
  />
))({
  width: '100%',
  fontSize: '1rem'
});

interface IAdminCategoryRemoveFormModalProps {
  open: boolean;
  handleClick: () => void;
}

const AdminCategoryRemoveFormModal: FC<IAdminCategoryRemoveFormModalProps> = ({ handleClick, open }) => {
  const [isRemoveLoading, setRemoveLoading] = useState(false);
  const { request } = useHttp();
  const { mode } = useColorMode();
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<IAdminCategoryFormModalSubmit>({ mode: 'onBlur' });
  const { productListError, isProductListLoading, productsList } = useAppSelector((state) => state.productsReducer);
  const { categoriesList, categoriesListError, isCategoriesListLoading } = useAppSelector(
    (state) => state.categoriesReducer
  );

  useEffect(() => {
    if (open) {
      dispatch(fetchAllProducts());
      dispatch(fetchAllCategories());
      reset();
    }
  }, [open]);

  const onSubmit: SubmitHandler<IAdminCategoryFormModalSubmit> = async (data) => {
    const { categoryName: id } = data;
    try {
      setRemoveLoading(true);
      await request(`${baseUrlCategories}/${id}`, 'DELETE');
      dispatch(categoriesRemoveById(id));
      reset();
      notify('success', 'Категория была успешно удалена', mode);
    } catch {
      notify('error', 'Произошла ошибка при удалении категории', mode);
    } finally {
      setRemoveLoading(false);
    }
  };

  const uniqueCategories = getUniqueCategories(productsList);

  return (
    <StyledModal
      open={open}
      onClose={handleClick}
    >
      <StyledPaper elevation={24}>
        {categoriesListError || productListError ? (
          <ErrorMsg variant="h6">
            {categoriesListError || productListError}. Пожалуйста перезагрузите страницу.
          </ErrorMsg>
        ) : (
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              variant="h6"
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              Удалить категорию
            </Typography>
            <Box
              sx={{
                p: 1,
                borderTop: '1px solid #000',
                borderBottom: '1px solid #000'
              }}
            >
              <Typography
                sx={{
                  textAlign: 'center'
                }}
              >
                Можно удалить только неиспользуемые категории
              </Typography>
              {isCategoriesListLoading || isProductListLoading || isRemoveLoading ? (
                <Box
                  sx={{
                    margin: '16px 0',
                    textAlign: 'center'
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Controller
                  rules={{
                    required: ValidationErrorMsg.REQUIRED
                  }}
                  defaultValue=""
                  name="categoryName"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      disabled={isCategoriesListLoading || isProductListLoading}
                      select
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e)}
                      helperText={error?.message || ' '}
                      error={!!error?.message}
                      fullWidth
                      variant="filled"
                      label="Категории"
                    >
                      {categoriesList.map(({ categoryName, id }) => (
                        <MenuItem
                          disabled={uniqueCategories.includes(categoryName)}
                          key={id}
                          value={id}
                        >
                          {categoryName}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              )}
            </Box>
            <Box
              sx={{
                p: 1
              }}
            >
              <StyledBtn disabled={isCategoriesListLoading || isRemoveLoading || isProductListLoading}>
                Удалить
              </StyledBtn>
            </Box>
          </form>
        )}
      </StyledPaper>
    </StyledModal>
  );
};

export default AdminCategoryRemoveFormModal;
