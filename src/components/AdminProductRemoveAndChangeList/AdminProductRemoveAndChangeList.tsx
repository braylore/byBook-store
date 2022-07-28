import { Stack } from '@mui/material';
import { FC } from 'react';
import { IProducts } from 'types/IProducts';
// eslint-disable-next-line max-len
import AdminProductRemoveAndChangeListItem from 'components/AdminProductRemoveAndChangeListItem/AdminProductRemoveAndChangeListItem';

interface IAdminProductRemoveAndChangeListProps {
  isDisabled: boolean;
  productsList: IProducts[];
  handleRemoveClick: (id: string) => Promise<void>;
}

const AdminProductRemoveAndChangeList: FC<IAdminProductRemoveAndChangeListProps> = ({
  productsList,
  handleRemoveClick,
  isDisabled
}) => {
  return (
    <Stack spacing={1}>
      {productsList.map((p) => (
        <AdminProductRemoveAndChangeListItem
          key={p.id}
          handleRemoveClick={handleRemoveClick}
          product={p}
          isDisabled={isDisabled}
        />
      ))}
    </Stack>
  );
};

export default AdminProductRemoveAndChangeList;
