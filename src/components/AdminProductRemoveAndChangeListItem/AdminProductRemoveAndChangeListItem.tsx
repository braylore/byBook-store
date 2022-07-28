import { Box, Paper, styled, Typography, TypographyProps } from '@mui/material';
import { FC } from 'react';
import AdminProductChangeFormWrapper from 'components/AdminProductChangeFormWrapper/AdminProductChangeFormWrapper';
import AdminProductRemoveFormModal from 'components/AdminProductRemoveFormModal/AdminProductRemoveFormModal';
import { IProducts } from 'types/IProducts';

const Title = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
  fontSize: '1rem',
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: '0.7rem'
  }
}));

interface IAdminProductRemoveAndChangeListItemProps {
  product: IProducts;
  isDisabled: boolean;
  handleRemoveClick: (id: string) => Promise<void>;
}

const AdminProductRemoveAndChangeListItem: FC<IAdminProductRemoveAndChangeListItemProps> = ({
  handleRemoveClick,
  product,
  isDisabled
}) => {
  return (
    <Paper
      elevation={4}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 0.5
      }}
    >
      <Title>{product.title}</Title>
      <Box>
        <AdminProductChangeFormWrapper
          isDisabled={isDisabled}
          product={product}
        />
        <AdminProductRemoveFormModal
          isDisabled={isDisabled}
          handleRemoveClick={handleRemoveClick}
          id={product.id}
        />
      </Box>
    </Paper>
  );
};

export default AdminProductRemoveAndChangeListItem;
