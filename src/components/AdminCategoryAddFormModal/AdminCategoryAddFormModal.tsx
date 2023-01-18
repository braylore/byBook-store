import { Box, Button, ButtonProps, Modal, Paper, styled, TextField, Typography } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { FC, useState } from 'react';
import { ValidationErrorMsg } from 'validation';
import { notify } from 'utils/notify';
import { useColorMode } from 'hooks/useColorMode';
import { useDidMountEffect } from 'hooks/useDidMountEffect';
import { useHttp } from 'hooks/useHttp';
import { baseUrlCategories } from 'constants/baseUrls';
import { v4 as uuidv4 } from 'uuid';

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

export interface IAdminCategoryFormModalSubmit {
  categoryName: string;
}

interface IAdminCategoryAddFormModalProps {
  handleClick: () => void;
  open: boolean;
}

const AdminCategoryAddFormModal: FC<IAdminCategoryAddFormModalProps> = ({ handleClick, open }) => {
  const [isAddLoading, setAddLoading] = useState(false);
  const { request } = useHttp();
  const { control, handleSubmit, reset } = useForm<IAdminCategoryFormModalSubmit>({ mode: 'onBlur' });
  const { mode } = useColorMode();

  useDidMountEffect(() => {
    if (open) {
      reset();
    }
  }, [open]);

  const onSubmit: SubmitHandler<IAdminCategoryFormModalSubmit> = async (data) => {
    try {
      setAddLoading(true);
      await request(baseUrlCategories, 'POST', JSON.stringify({ id: uuidv4(), ...data }));
      notify('success', 'Категория была успешно добавлена', mode);
      reset();
    } catch {
      notify('error', 'Произошла ошибка при добавлении категории', mode);
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <StyledModal
      onClose={handleClick}
      open={open}
    >
      <StyledPaper elevation={24}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Typography
            variant="h6"
            sx={{
              p: 1,
              textAlign: 'center'
            }}
          >
            Добавить категорию
          </Typography>
          <Box
            sx={{
              p: 1,
              borderTop: '1px solid #000',
              borderBottom: '1px solid #000'
            }}
          >
            <Controller
              rules={{
                required: ValidationErrorMsg.REQUIRED
              }}
              defaultValue=""
              name="categoryName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  margin="normal"
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e)}
                  helperText={error?.message || ' '}
                  error={!!error?.message}
                  fullWidth
                  label="Категория"
                  placeholder="Введите категорию"
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
            <StyledBtn disabled={isAddLoading}>Добавить</StyledBtn>
          </Box>
        </form>
      </StyledPaper>
    </StyledModal>
  );
};

export default AdminCategoryAddFormModal;
