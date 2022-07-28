import { ChangeCircle } from '@mui/icons-material';
import { IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { FC, useState } from 'react';
import AdminProductChangeOrAddFormModal, {
  IAdminProductFormSubmit
} from 'components/AdminProductChangeOrAddFormModal/AdminProductChangeOrAddFormModal';
import { IProducts } from 'types/IProducts';
import { useHttp } from 'hooks/useHttp';
import { useColorMode } from 'hooks/useColorMode';
import { SubmitHandler } from 'react-hook-form';
import { basketItemAdminChange } from 'store/slices/basketSlice';
import { useAppDispatch } from 'hooks/redux';
import { productChangeById } from 'store/slices/productsSlice';
import { notify } from 'utils/notify';
import { jsonServerBaseUrl } from 'constants/jsonServerUrl';

interface IAdminProductChangeFormWrapperProps {
  product: IProducts;
  isDisabled: boolean;
}

const AdminProductChangeFormWrapper: FC<IAdminProductChangeFormWrapperProps> = ({ product, isDisabled }) => {
  const [isChangeLoading, setChangeLoading] = useState(false);
  const { request } = useHttp();
  const matches = useMediaQuery('(max-width: 400px)');
  const [open, setOpen] = useState(false);
  const { mode } = useColorMode();
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeFormSubmit: SubmitHandler<IAdminProductFormSubmit> = async (data) => {
    try {
      setChangeLoading(true);
      await request(`${jsonServerBaseUrl}/products/${product.id}`, 'PUT', JSON.stringify({ ...data }));
      notify('success', 'Продукт был успешно изменен', mode);
      dispatch(basketItemAdminChange({ id: product.id, ...data }));
      dispatch(productChangeById({ id: product.id, ...data }));
      handleClose();
    } catch {
      notify('error', 'Произошла ошибка при изменении продукта', mode);
    } finally {
      setChangeLoading(false);
    }
  };

  return (
    <>
      <Tooltip title="Изменить">
        <span>
          <IconButton
            disabled={isDisabled}
            size={matches ? 'small' : 'medium'}
            onClick={handleOpen}
          >
            <ChangeCircle fontSize={matches ? 'small' : 'medium'} />
          </IconButton>
        </span>
      </Tooltip>
      <AdminProductChangeOrAddFormModal
        text="Изменить"
        isDisabled={isChangeLoading}
        handleAddOrChangeSubmit={onChangeFormSubmit}
        product={product}
        open={open}
        handleClick={handleClose}
      />
    </>
  );
};

export default AdminProductChangeFormWrapper;
