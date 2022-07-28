import { useAppSelector } from 'hooks/redux';
import { Stack, Typography, styled, Button, ButtonProps, Box } from '@mui/material';
import { useCredentials } from 'hooks/useCredentials';
import BasketList from 'components/BasketList/BasketList';
import BasketBar from 'components/BasketBar/BasketBar';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column'
});

const BackBtn = styled((props: ButtonProps) => (
  <Button
    startIcon={<ArrowBack />}
    variant="outlined"
    size="medium"
    color="inherit"
    {...props}
  />
))({
  minWidth: '30%',
  marginTop: '10px'
});

const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  marginTop: '1rem',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row'
  }
}));

const BasketPage = () => {
  const navigate = useNavigate();
  const { basket: wholeBasket } = useAppSelector((state) => state.basketReducer);
  const { id: userId } = useCredentials();

  const basket = wholeBasket.find((b) => b.userId === userId);

  if (!basket || basket.userBasket.length === 0) {
    return (
      <Wrapper>
        <Typography
          variant="h4"
          sx={{
            mt: '1rem',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Ваша корзина пуста
        </Typography>
        <BackBtn onClick={() => navigate(-1)}>Назад</BackBtn>
      </Wrapper>
    );
  }

  return (
    <StyledStack>
      <BasketList
        userBasket={basket.userBasket}
        userId={userId}
      />
      <BasketBar
        totalAmount={basket.totalAmount}
        totalPrice={basket.totalPrice}
      />
    </StyledStack>
  );
};

export default BasketPage;
