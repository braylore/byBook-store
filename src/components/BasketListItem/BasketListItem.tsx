import { Add, CurrencyRuble, Info, Remove } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  Card,
  CardContent,
  CardHeader,
  CardHeaderProps,
  CardProps,
  Divider,
  styled,
  Typography
} from '@mui/material';
import { FC, MouseEvent } from 'react';
import { IUserBasket } from 'types/IBasket';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'constants/routes';
import { cutLongString } from 'utils/cutLongString';

const BasketCard = styled((props: CardProps) => (
  <Card
    elevation={6}
    {...props}
  />
))({
  borderRadius: '10px',
  display: 'flex',
  alignContent: 'center',
  height: '170px'
});

const ImgWrapper = styled(Box)(({ theme }) => ({
  padding: '4px',
  height: '100%',
  width: '110px',
  [theme.breakpoints.between('xs', 'sm')]: {
    display: 'none'
  }
}));

const Img = styled('img')({
  wordBreak: 'break-all',
  objectFit: 'cover',
  width: '110px',
  height: '100%',
  borderRadius: '10px'
});

const Wrapper = styled(Box)({
  padding: '1rem 1rem 1.5rem',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'space-between'
});

const BasketHeader = styled((props: CardHeaderProps) => (
  <CardHeader
    disableTypography
    {...props}
  />
))({
  wordBreak: 'break-all',
  padding: '0',
  textAlign: 'center'
});

const BasketHeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: '0.9rem'
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.4rem'
  }
}));

const BasketHeaderSubheader = styled(Typography)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
    fontSize: '1rem'
  }
}));

const BasketText = styled(Typography)({
  display: 'flex',
  justifyContent: 'center'
});

const ContentWrapper = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const BasketBtnWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid',
  borderColor: 'primary.main',
  borderRadius: '20px'
});

const BtnInfo = styled((props: ButtonProps) => (
  <Button
    endIcon={<Info />}
    variant="outlined"
    size="medium"
    color="inherit"
    type="button"
    {...props}
  />
))({
  marginTop: '10px'
});

interface IBasketListItemProps extends IUserBasket {
  userId: string | null;
  handleItemDec: (basketUserId: string | null, basketProductId: string, basketItemAmount: number) => void;
  handleItemInc: (basketUserId: string | null, basketProductId: string) => void;
}

const BasketListItem: FC<IBasketListItemProps> = ({
  id,
  amount,
  author,
  title,
  price,
  img,
  handleItemDec,
  handleItemInc,
  userId
}) => {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent, path: number | string) => {
    e.preventDefault();
    navigate(`/${Routes.PRODUCT}/${path}`);
  };

  return (
    <BasketCard>
      <ImgWrapper>
        <Img
          src={img}
          alt={cutLongString(title)}
        />
      </ImgWrapper>
      <Wrapper>
        <BasketHeader
          title={<BasketHeaderTitle>{cutLongString(title)}</BasketHeaderTitle>}
          subheader={<BasketHeaderSubheader>{cutLongString(author)}</BasketHeaderSubheader>}
        />
        <BasketText>
          {price} <CurrencyRuble />
        </BasketText>
      </Wrapper>
      <ContentWrapper>
        <BasketBtnWrapper>
          <Typography>Количество</Typography>
          <Divider
            sx={{
              borderColor: 'primary.main'
            }}
            flexItem
          />
          <ButtonGroup
            sx={{
              borderRadius: '20px'
            }}
            variant="text"
          >
            <Button
              disableRipple
              onClick={() => handleItemDec(userId, id, amount)}
              sx={{
                borderBottomLeftRadius: '20px'
              }}
            >
              <Remove />
            </Button>
            <Button disabled>
              <Box
                sx={{
                  color: 'text.primary'
                }}
              >
                {amount}
              </Box>
            </Button>
            <Button
              disableRipple
              disabled={amount === 5}
              onClick={() => handleItemInc(userId, id)}
              sx={{
                borderBottomRightRadius: '20px'
              }}
            >
              <Add />
            </Button>
          </ButtonGroup>
        </BasketBtnWrapper>
        <BtnInfo
          href={`/${Routes.PRODUCT}/${id}`}
          onClick={(e) => handleClick(e, id)}
        >
          Подробнее
        </BtnInfo>
      </ContentWrapper>
    </BasketCard>
  );
};

export default BasketListItem;
