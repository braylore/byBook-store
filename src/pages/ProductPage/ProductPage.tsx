import { useEffect } from 'react';
import { fetchProductById } from 'store/slices/productsSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useParams, useNavigate } from 'react-router-dom';
import ProductInfo from 'components/ProductInfo/ProductInfo';
import { Button, ButtonProps, Typography, styled, Box, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

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

const Wrapper = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column'
});

const ErrorMsg = styled(Typography)({
  marginTop: '1rem',
  textAlign: 'center',
  fontWeight: 'bold'
});

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { specificProductError, isProductSpecificLoading, productSpecific } = useAppSelector(
    (state) => state.productsReducer
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, []);

  if (isProductSpecificLoading) {
    return (
      <Box
        sx={{
          mt: '1rem',
          textAlign: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (specificProductError) {
    return (
      <Wrapper>
        <ErrorMsg variant="h5">{specificProductError}</ErrorMsg>
        <BackBtn onClick={() => navigate(-1)}>Назад</BackBtn>
      </Wrapper>
    );
  }

  return <div>{productSpecific && <ProductInfo {...productSpecific} />}</div>;
};

export default ProductPage;
