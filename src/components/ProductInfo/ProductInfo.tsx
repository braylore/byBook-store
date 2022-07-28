import { FC } from 'react';
import { IProducts } from 'types/IProducts';
import { Box, Button, Grid, Typography, styled, ButtonProps, Tooltip } from '@mui/material';
import { AddShoppingCart, CurrencyRuble, RemoveShoppingCart, ArrowBack } from '@mui/icons-material';
import { basketItemRemove, basketItemAdd } from 'store/slices/basketSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useCredentials } from 'hooks/useCredentials';
import { useNavigate } from 'react-router-dom';

const Img = styled('img')({
  display: 'block',
  width: '100%',
  height: 'auto',
  borderRadius: '10px'
});

const ImgWrapper = styled(Box)(({ theme }) => ({
  borderRadius: '10px',
  border: '2px solid',
  borderColor: theme.palette.divider,
  minHeight: '400px'
}));

const BackBtn = styled((props: ButtonProps) => (
  <Button
    startIcon={<ArrowBack />}
    fullWidth
    variant="outlined"
    size="medium"
    color="inherit"
    {...props}
  />
))({
  marginBottom: '10px'
});

const BasketBtn = styled((props: ButtonProps) => (
  <Button
    fullWidth
    variant="outlined"
    size="medium"
    {...props}
  />
))({
  marginTop: '10px'
});

const DisabledBtnWrapper = styled('div')({
  width: '100%'
});

const ProductInfo: FC<IProducts> = ({ author, category, description, img, numberOfPages, price, title, id }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, id: userId } = useCredentials();
  const { basket } = useAppSelector((state) => state.basketReducer);

  const handleClick = () => {
    navigate(-1);
  };

  const handleItemAdd = () => {
    const payloadBasketAddObj = {
      userId,
      userBasket: {
        id,
        title,
        price,
        img,
        author,
        category,
        description,
        numberOfPages,
        amount: 1
      }
    };
    dispatch(basketItemAdd(payloadBasketAddObj));
  };

  const handleItemRemove = (productId: string, userBasketId: string | null) => {
    const payloadRemoveObj = {
      userId: userBasketId,
      id: productId
    };
    dispatch(basketItemRemove(payloadRemoveObj));
  };

  const renderElements = () => {
    if (!isAuth) {
      return (
        <Tooltip title="Требуется авторизация">
          <DisabledBtnWrapper>
            <BasketBtn
              disabled
              endIcon={<AddShoppingCart />}
            >
              Добавить
            </BasketBtn>
          </DisabledBtnWrapper>
        </Tooltip>
      );
    }

    const userBasketIndex = basket.findIndex((b) => b.userId === userId);
    if (!basket[userBasketIndex].userBasket.some((b) => b.id === id)) {
      return (
        <BasketBtn
          color="success"
          onClick={handleItemAdd}
          endIcon={<AddShoppingCart />}
        >
          Добавить
        </BasketBtn>
      );
    }

    return (
      <BasketBtn
        color="error"
        onClick={() => handleItemRemove(id, userId)}
        endIcon={<RemoveShoppingCart />}
      >
        Убрать
      </BasketBtn>
    );
  };

  const renderShopBtn = renderElements();

  return (
    <>
      <Box
        sx={{
          mt: '1rem'
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {title}
        </Typography>
        <Typography
          component="h2"
          variant="h6"
          sx={{
            textAlign: 'center'
          }}
        >
          {author}
        </Typography>
      </Box>
      <Grid
        spacing={2}
        sx={{
          mt: '10px',
          justifyContent: 'center'
        }}
        container
      >
        <Grid item>
          <BackBtn onClick={handleClick}>Назад</BackBtn>
          <ImgWrapper>
            <Img
              src={img}
              alt={title}
            />
          </ImgWrapper>
          {renderShopBtn}
        </Grid>
        <Grid
          lg={8}
          md={6}
          sm={6}
          item
        >
          <Box>{description}</Box>
          <Box
            sx={{
              mt: '5px'
            }}
          >
            <b>Жанр: </b>
            {category.join(', ')}
          </Box>

          <Box
            sx={{
              mt: '5px'
            }}
          >
            <b>Количество страниц: </b>
            {numberOfPages}
          </Box>

          <Box
            sx={{
              mt: '5px',
              display: 'flex',
              alignContent: 'center'
            }}
          >
            <Box
              sx={{
                fontWeight: 'bold',
                mr: '4px'
              }}
            >
              Цена:
            </Box>
            {price} <CurrencyRuble />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductInfo;
