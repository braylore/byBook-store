import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Stack,
  styled,
  Box,
  Button,
  CardActions,
  CardActionArea,
  ButtonProps,
  Tooltip
} from '@mui/material';
import { AddShoppingCart, CurrencyRuble, RemoveShoppingCart } from '@mui/icons-material';
import { FC } from 'react';
import { IProducts } from 'types/IProducts';
import { Link } from 'react-router-dom';
import { Routes } from 'constants/routes';
import { basketItemAdd, basketItemRemove } from 'store/slices/basketSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useCredentials } from 'hooks/useCredentials';

const PriceWrapper = styled('div')({
  display: 'flex',
  alignContent: 'center',
  fontSize: '18px',
  fontWeight: 'bold'
});

const TitleWrapper = styled('div')({
  fontSize: '16px',
  fontWeight: 'bold',
  minHeight: '36px'
});

const BackBtn = styled((props: ButtonProps) => (
  <Button
    variant="outlined"
    size="medium"
    fullWidth
    {...props}
  />
))({});

const DisabledBtnWrapper = styled('div')({
  width: '100%'
});

const ShopListItem: FC<IProducts> = ({ title, price, img, author, id, category, description, numberOfPages }) => {
  const dispatch = useAppDispatch();
  const { isAuth, id: userId } = useCredentials();
  const { basket } = useAppSelector((state) => state.basketReducer);

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
            <BackBtn
              disabled
              endIcon={<AddShoppingCart />}
            >
              Добавить
            </BackBtn>
          </DisabledBtnWrapper>
        </Tooltip>
      );
    }

    const userBasketIndex = basket.findIndex((b) => b.userId === userId);
    if (!basket[userBasketIndex].userBasket.some((b) => b.id === id)) {
      return (
        <BackBtn
          color="success"
          onClick={handleItemAdd}
          endIcon={<AddShoppingCart />}
        >
          Добавить
        </BackBtn>
      );
    }

    return (
      <BackBtn
        color="error"
        onClick={() => handleItemRemove(id, userId)}
        endIcon={<RemoveShoppingCart />}
      >
        Убрать
      </BackBtn>
    );
  };

  const renderShopBtn = renderElements();

  return (
    <Grid
      lg={4}
      md={6}
      sm={6}
      item
      sx={{
        width: '290px'
      }}
    >
      <Card
        elevation={4}
        sx={{
          height: '486px'
        }}
      >
        <CardActionArea>
          <Link to={`${Routes.PRODUCT}/${id}`}>
            <CardMedia
              component="img"
              image={img}
              alt={title}
              sx={{
                objectFit: 'contain',
                height: '300px',
                mt: 1
              }}
            />
            <CardContent>
              <PriceWrapper>
                {price}
                <CurrencyRuble />
              </PriceWrapper>

              <Stack
                sx={{
                  textAlign: 'center'
                }}
                spacing={1}
                direction="column"
              >
                <Box
                  style={{
                    fontSize: '14px'
                  }}
                >
                  {author}
                </Box>
                <TitleWrapper>{title}</TitleWrapper>
              </Stack>
            </CardContent>
          </Link>
        </CardActionArea>
        <Divider />
        <CardActions>{renderShopBtn}</CardActions>
      </Card>
    </Grid>
  );
};

export default ShopListItem;
