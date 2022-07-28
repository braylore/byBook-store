import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          mb: '1rem'
        }}
      >
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
