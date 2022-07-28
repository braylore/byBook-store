import { CurrencyRuble } from '@mui/icons-material';
import { Box, Button, Divider, Paper, Typography, styled, PaperProps, ButtonProps } from '@mui/material';
import { BoxProps } from '@mui/system';
import { FC } from 'react';

const BasketBarPaper = styled((props: PaperProps) => (
  <Paper
    elevation={6}
    {...props}
  />
))(({ theme }) => ({
  marginLeft: '0px',
  marginTop: '8px',
  padding: '8px',
  position: 'sticky',
  top: '80px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  [theme.breakpoints.up('md')]: {
    marginLeft: '8px',
    marginTop: '0px'
  }
}));

const BasketTextTitle = styled(Typography)({
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '18px'
});

const BasketTextBold = styled(Typography)({
  fontWeight: 'bold'
});

const BasketTextPrice = styled(Typography)({
  display: 'flex',
  alignContent: 'center'
});

const BasketBuyBtn = styled((props: ButtonProps) => (
  <Button
    variant="outlined"
    size="medium"
    color="inherit"
    type="button"
    // eslint-disable-next-line no-console
    onClick={() => console.log('buy')}
    {...props}
  />
))({
  marginTop: '8px'
});

const BasketPaperWrapper = styled(Box)({
  width: '100%'
});

const BasketWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px'
});

const BasketBarWrapper = styled((props: BoxProps) => (
  <Box
    flex={3}
    {...props}
  />
))({
  display: 'flex',
  justifyContent: 'center'
});

interface IBasketBarProps {
  totalAmount: number;
  totalPrice: number;
}

const BasketBar: FC<IBasketBarProps> = ({ totalAmount, totalPrice }) => {
  return (
    <BasketBarWrapper>
      <BasketPaperWrapper>
        <BasketBarPaper>
          <BasketTextTitle>Ваша корзина</BasketTextTitle>
          <Divider />
          <BasketWrapper>
            <BasketTextBold>Товары</BasketTextBold>
            <Typography>{totalAmount} шт.</Typography>
          </BasketWrapper>
          <Divider />
          <BasketWrapper>
            <BasketTextBold>Общая стоимость</BasketTextBold>
            <BasketTextPrice>
              {totalPrice} <CurrencyRuble />
            </BasketTextPrice>
          </BasketWrapper>
          <Divider />
          <BasketBuyBtn>Купить</BasketBuyBtn>
        </BasketBarPaper>
      </BasketPaperWrapper>
    </BasketBarWrapper>
  );
};

export default BasketBar;
