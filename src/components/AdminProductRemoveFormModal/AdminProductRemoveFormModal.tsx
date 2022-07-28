import { Delete } from '@mui/icons-material';
import { Button, IconButton, Modal, Paper, Tooltip, styled, Box, ButtonProps, useMediaQuery } from '@mui/material';
import { FC, useState } from 'react';

const Wrapper = styled(Paper)({
  maxWidth: '95%',
  border: '2px solid #000',
  padding: '1rem',
  borderRadius: '10px'
});

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const StyledBtn = styled((props: ButtonProps) => (
  <Button
    color="inherit"
    variant="outlined"
    type="button"
    {...props}
  />
))({
  fontSize: '1rem'
});

const Question = styled('h3')({
  textAlign: 'center'
});

const BtnWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between'
});

interface IAdminProductRemoveFormModalProps {
  isDisabled: boolean;
  handleRemoveClick: (id: string) => Promise<void>;
  id: string;
}

const AdminProductRemoveFormModal: FC<IAdminProductRemoveFormModalProps> = ({ handleRemoveClick, id, isDisabled }) => {
  const matches = useMediaQuery('(max-width:400px)');
  const [open, setOpen] = useState(false);
  const [isRemoveBtnDisabled, setRemoveBtnDisabled] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async (productId: string) => {
    setRemoveBtnDisabled(true);
    await handleRemoveClick(productId);
    setRemoveBtnDisabled(false);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Удалить">
        <span>
          <IconButton
            size={matches ? 'small' : 'medium'}
            disabled={isDisabled}
            onClick={handleOpen}
          >
            <Delete fontSize={matches ? 'small' : 'medium'} />
          </IconButton>
        </span>
      </Tooltip>
      <StyledModal
        hideBackdrop
        open={open}
        onClose={handleClose}
      >
        <Wrapper elevation={24}>
          <Question>Вы действительно хотите удалить этот продукт?</Question>
          <BtnWrapper>
            <StyledBtn onClick={handleClose}>Закрыть</StyledBtn>
            <StyledBtn
              disabled={isRemoveBtnDisabled}
              onClick={() => handleClick(id)}
            >
              Удалить
            </StyledBtn>
          </BtnWrapper>
        </Wrapper>
      </StyledModal>
    </>
  );
};

export default AdminProductRemoveFormModal;
