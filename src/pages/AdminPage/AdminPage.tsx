import { Button, ButtonProps, Stack, styled } from '@mui/material';
import { useState } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import { SubmitHandler } from 'react-hook-form';
import { useColorMode } from 'hooks/useColorMode';
import AdminProductChangeOrAddFormModal, {
  IAdminProductFormSubmit
} from 'components/AdminProductChangeOrAddFormModal/AdminProductChangeOrAddFormModal';
// eslint-disable-next-line max-len
import AdminProductRemoveAndChangeListModal from 'components/AdminProductRemoveAndChangeListModal/AdminProductRemoveAndChangeListModal';
import AdminCategoryAddFormModal from 'components/AdminCategoryAddFormModal/AdminCategoryAddFormModal';
import { notify } from 'utils/notify';
import AdminCategoryRemoveFormModal from 'components/AdminCategoryRemoveFormModal/AdminCategoryRemoveFormModal';
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from 'hooks/useHttp';
import { baseUrlProducts } from 'constants/baseUrls';
import 'react-toastify/dist/ReactToastify.css';

const StyledBtn = styled((props: ButtonProps) => (
  <Button
    color="inherit"
    variant="outlined"
    type="button"
    {...props}
  />
))({
  width: '100%',
  fontSize: '1rem'
});

const AdminPage = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openRemoveForm, setOpenRemoveForm] = useState(false);
  const [openCategoryAddForm, setOpenCategoryAddForm] = useState(false);
  const [openCategoryRemoveForm, setOpenCategoryRemoveForm] = useState(false);
  const { mode } = useColorMode();
  const { request } = useHttp();
  const [isAddLoading, setAddLoading] = useState(false);

  const handleCategoryAddFormClick = () => {
    if (openCategoryAddForm) {
      setOpenCategoryAddForm(false);
    } else {
      setOpenCategoryAddForm(true);
    }
  };

  const handleRemoveFormClick = () => {
    if (openRemoveForm) {
      setOpenRemoveForm(false);
    } else {
      setOpenRemoveForm(true);
    }
  };

  const handleAddFormClick = () => {
    if (openAddForm) {
      setOpenAddForm(false);
    } else {
      setOpenAddForm(true);
    }
  };

  const handleCategoryRemoveFormClick = () => {
    if (openCategoryRemoveForm) {
      setOpenCategoryRemoveForm(false);
    } else {
      setOpenCategoryRemoveForm(true);
    }
  };

  const onAddFormSubmit: SubmitHandler<IAdminProductFormSubmit> = async (data) => {
    try {
      setAddLoading(true);
      await request(baseUrlProducts, 'POST', JSON.stringify({ id: uuidv4(), ...data }));
      notify('success', 'Продукт был успешно добавлен', mode);
    } catch {
      notify('error', 'Произошла ошибка при добавлении продукта', mode);
      throw new Error('error');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        transition={Slide}
        limit={5}
      />
      <Stack
        spacing={2}
        direction="column"
        sx={{
          alignItems: 'center',
          mt: '1rem'
        }}
      >
        <StyledBtn onClick={handleAddFormClick}>Добавить товар</StyledBtn>
        <StyledBtn onClick={handleRemoveFormClick}>Удалить/Изменить товар</StyledBtn>
        <StyledBtn onClick={handleCategoryAddFormClick}>Добавить категорию</StyledBtn>
        <StyledBtn onClick={handleCategoryRemoveFormClick}>Удалить категорию</StyledBtn>
      </Stack>
      <AdminProductChangeOrAddFormModal
        text="Добавить"
        isDisabled={isAddLoading}
        handleAddOrChangeSubmit={onAddFormSubmit}
        handleClick={handleAddFormClick}
        open={openAddForm}
      />
      <AdminProductRemoveAndChangeListModal
        handleClick={handleRemoveFormClick}
        open={openRemoveForm}
      />
      <AdminCategoryAddFormModal
        handleClick={handleCategoryAddFormClick}
        open={openCategoryAddForm}
      />
      <AdminCategoryRemoveFormModal
        handleClick={handleCategoryRemoveFormClick}
        open={openCategoryRemoveForm}
      />
    </>
  );
};

export default AdminPage;
