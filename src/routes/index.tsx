import { Routes } from 'constants/routes';
import AdminPage from 'pages/AdminPage/AdminPage';
import AuthPage from 'pages/AuthPage/AuthPage';
import BasketPage from 'pages/BasketPage/BasketPage';
import ProductPage from 'pages/ProductPage/ProductPage';
import ShopPage from 'pages/ShopPage/ShopPage';
import WithAuth from 'components/hoc/WithAuth/WithAuth';
import WithNonAuth from 'components/hoc/WithNonAuth/WithNonAuth';
import WithAdmin from 'components/hoc/WithAdmin/WithAdmin';

const privateRoutes = [
  {
    path: Routes.ADMIN,
    element: (
      <WithAdmin>
        <AdminPage />
      </WithAdmin>
    )
  },
  {
    path: Routes.BASKET,
    element: (
      <WithAuth>
        <BasketPage />
      </WithAuth>
    )
  }
];

const publicRoutes = [
  {
    path: Routes.LOGIN,
    element: (
      <WithNonAuth>
        <AuthPage />
      </WithNonAuth>
    )
  },
  {
    path: Routes.REGISTRATION,
    element: (
      <WithNonAuth>
        <AuthPage />
      </WithNonAuth>
    )
  },
  {
    path: Routes.SHOP,
    element: <ShopPage />
  },
  {
    path: `${Routes.PRODUCT}/:id`,
    element: <ProductPage />
  }
];

export const appRoutes = [...publicRoutes, ...privateRoutes];
