import {
  Button,
  ButtonProps,
  Modal,
  ModalProps,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
  MenuItem,
  Checkbox,
  ListItemText,
  Box
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { FC, useEffect } from 'react';
import { numberValidation, ValidationErrorMsg, descriptionValidation } from 'validation';
import { IProducts } from 'types/IProducts';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchAllCategories } from 'store/slices/categoriesSlice';

const ErrorMsg = styled(Typography)({
  padding: '1rem',
  textAlign: 'center',
  fontWeight: 'bold'
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

const StyledModal = styled((props: ModalProps) => <Modal {...props} />)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export interface IAdminProductFormSubmit {
  title: string;
  author: string;
  description: string;
  numberOfPages: number;
  price: number;
  img: string;
  category: string[];
}

interface IAdminProductChangeOrAddFormModalProps {
  isDisabled: boolean;
  handleAddOrChangeSubmit: (data: IAdminProductFormSubmit) => Promise<unknown> | void;
  open: boolean;
  handleClick: () => void;
  text: string;
  product?: IProducts;
}

const AdminProductChangeOrAddFormModal: FC<IAdminProductChangeOrAddFormModalProps> = ({
  handleClick,
  open,
  product,
  isDisabled,
  handleAddOrChangeSubmit,
  text
}) => {
  const { control, handleSubmit, reset, clearErrors } = useForm<IAdminProductFormSubmit>({
    mode: 'onBlur'
  });
  const dispatch = useAppDispatch();
  const { categoriesList, categoriesListError, isCategoriesListLoading } = useAppSelector(
    (state) => state.categoriesReducer
  );

  useEffect(() => {
    if (open) {
      dispatch(fetchAllCategories());
      if (product) {
        clearErrors();
      } else {
        reset();
      }
    }
  }, [open]);

  const conditionSubmit = async (data: IAdminProductFormSubmit) => {
    if (!product) {
      try {
        await handleAddOrChangeSubmit(data);
        reset();
      } catch {
        // eslint-disable-next-line no-console
        console.log('error');
      }
    } else {
      handleAddOrChangeSubmit(data);
    }
  };

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
        {categoriesListError ? (
          <ErrorMsg variant="h6">{categoriesListError}. Пожалуйста перезагрузите страницу.</ErrorMsg>
        ) : (
          <form
            autoComplete="off"
            onSubmit={handleSubmit(conditionSubmit)}
          >
            <Typography
              variant="h6"
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              {`${text} товар`}
            </Typography>
            <Box
              sx={{
                p: 1.2,
                borderTop: '1px solid #000',
                borderBottom: '1px solid #000'
              }}
            >
              <Stack
                direction="row"
                spacing={2}
              >
                <Box flex={1}>
                  <Controller
                    rules={{
                      required: ValidationErrorMsg.REQUIRED
                    }}
                    defaultValue={product?.title || ''}
                    name="title"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e)}
                        helperText={error?.message || ' '}
                        error={!!error?.message}
                        fullWidth
                        size="small"
                        label="Название"
                        placeholder="Введите название"
                        variant="filled"
                      />
                    )}
                  />
                  <Controller
                    rules={{
                      required: ValidationErrorMsg.REQUIRED
                    }}
                    defaultValue={product?.author || ''}
                    name="author"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e)}
                        helperText={error?.message || ' '}
                        error={!!error?.message}
                        size="small"
                        fullWidth
                        label="Автор"
                        placeholder="Введите автора"
                        variant="filled"
                      />
                    )}
                  />
                  <Controller
                    rules={{
                      required: ValidationErrorMsg.REQUIRED
                    }}
                    defaultValue={product?.img || ''}
                    name="img"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e)}
                        helperText={error?.message || ' '}
                        error={!!error?.message}
                        size="small"
                        fullWidth
                        label="Адрес обложки"
                        placeholder="Введите адрес"
                        variant="filled"
                      />
                    )}
                  />
                </Box>
                <Box flex={1}>
                  <Controller
                    rules={{
                      required: ValidationErrorMsg.REQUIRED
                    }}
                    defaultValue={product?.category || []}
                    name="category"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        disabled={isCategoriesListLoading}
                        select
                        sx={{
                          maxWidth: '742px'
                        }}
                        SelectProps={{
                          multiple: true,
                          renderValue: () =>
                            field.value.length > 2 ? `${field.value.slice(0, 2).join(', ')}...` : field.value.join(', ')
                        }}
                        value={field.value || []}
                        onChange={(e) => field.onChange(e)}
                        helperText={error?.message || ' '}
                        error={!!error?.message}
                        fullWidth
                        size="small"
                        variant="filled"
                        label="Категории"
                      >
                        {categoriesList.map(({ categoryName, id }) => (
                          <MenuItem
                            key={id}
                            value={categoryName}
                          >
                            <Checkbox checked={field.value.includes(categoryName)} />
                            <ListItemText primary={categoryName} />
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                  <Controller
                    rules={numberValidation}
                    defaultValue={product?.numberOfPages || 100}
                    name="numberOfPages"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        value={field.value || 100}
                        onChange={(e) => field.onChange(+e.target.value)}
                        helperText={error?.message || ' '}
                        error={!!error?.message}
                        size="small"
                        fullWidth
                        type="number"
                        label="Количество страниц"
                        placeholder="Введите количество страниц"
                        variant="filled"
                      />
                    )}
                  />
                  <Controller
                    rules={numberValidation}
                    defaultValue={product?.price || 100}
                    name="price"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        value={field.value || 100}
                        onChange={(e) => field.onChange(+e.target.value)}
                        helperText={error?.message || ' '}
                        error={!!error?.message}
                        size="small"
                        fullWidth
                        type="number"
                        label="Цена"
                        placeholder="Введите цену"
                        variant="filled"
                      />
                    )}
                  />
                </Box>
              </Stack>
              <Controller
                rules={descriptionValidation}
                name="description"
                defaultValue={product?.description || ''}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e)}
                    helperText={error?.message || ' '}
                    error={!!error?.message}
                    size="small"
                    multiline
                    rows={3}
                    fullWidth
                    placeholder="Введите описание"
                    label="Описание"
                    variant="filled"
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                p: 1
              }}
            >
              <StyledBtn disabled={isDisabled || isCategoriesListLoading}>{text}</StyledBtn>
            </Box>
          </form>
        )}
      </Paper>
    </StyledModal>
  );
};

export default AdminProductChangeOrAddFormModal;
