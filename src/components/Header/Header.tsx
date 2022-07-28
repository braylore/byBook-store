import { ShoppingCart, DarkMode, WbSunny, AdminPanelSettings, Login, Logout } from '@mui/icons-material';
import { AppBar, Box, Toolbar, Typography, IconButton, Tooltip, styled, IconButtonProps, Badge } from '@mui/material';
import { useCredentials } from 'hooks/useCredentials';
import { useColorMode } from 'hooks/useColorMode';
import { Link } from 'react-router-dom';
import { Routes } from 'constants/routes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { removeUser } from 'store/slices/userSlice';

const HeaderBtn = styled((props: IconButtonProps) => (
  <IconButton
    size="large"
    {...props}
  />
))(({ theme }) => ({
  color: 'inherit',
  '&:hover': {
    color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark
  }
}));

const Header = () => {
  const { isAuth, id: userId, isAdmin } = useCredentials();
  const { mode, toggleColorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const { basket } = useAppSelector((state) => state.basketReducer);

  const handleLogout = () => {
    dispatch(removeUser());
  };

  const renderBtns = () => {
    const amount = basket.find((b) => b.userId === userId)?.totalAmount;
    if (isAuth) {
      return (
        <>
          <Tooltip title="Выйти">
            <span>
              <HeaderBtn onClick={handleLogout}>
                <Logout />
              </HeaderBtn>
            </span>
          </Tooltip>
          <Tooltip title="Корзина">
            <Link to={Routes.BASKET}>
              <HeaderBtn>
                <Badge
                  badgeContent={amount}
                  color="info"
                >
                  <ShoppingCart />
                </Badge>
              </HeaderBtn>
            </Link>
          </Tooltip>
          {isAdmin ? (
            <Tooltip title="Админ-панель">
              <Link to={Routes.ADMIN}>
                <HeaderBtn>
                  <AdminPanelSettings />
                </HeaderBtn>
              </Link>
            </Tooltip>
          ) : (
            <Tooltip title="Требуются права администратора">
              <span>
                <HeaderBtn disabled>
                  <AdminPanelSettings />
                </HeaderBtn>
              </span>
            </Tooltip>
          )}
        </>
      );
    }
    return (
      <>
        <Tooltip title="Войти">
          <span>
            <Link to={Routes.LOGIN}>
              <HeaderBtn>
                <Login />
              </HeaderBtn>
            </Link>
          </span>
        </Tooltip>
        <Tooltip title="Требуется авторизация">
          <span>
            <HeaderBtn disabled>
              <ShoppingCart />
            </HeaderBtn>
          </span>
        </Tooltip>
        <Tooltip title="Требуются права администратора">
          <span>
            <HeaderBtn disabled>
              <AdminPanelSettings />
            </HeaderBtn>
          </span>
        </Tooltip>
      </>
    );
  };

  const btnsElements = renderBtns();

  return (
    <AppBar
      sx={{ backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#a0b8f5' : 'default.background') }}
      position="sticky"
    >
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1
          }}
        >
          <Typography
            sx={{
              '&:hover': {
                color: 'primary.main'
              }
            }}
            variant="h6"
            component="span"
          >
            <Link to={Routes.SHOP}>ByBook</Link>
          </Typography>
        </Box>
        {btnsElements}
        <Tooltip title="Сменить тему">
          <span>
            <HeaderBtn onClick={toggleColorMode}>{mode === 'dark' ? <WbSunny /> : <DarkMode />}</HeaderBtn>
          </span>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
