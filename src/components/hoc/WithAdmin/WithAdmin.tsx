import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Routes } from 'constants/routes';
import { useCredentials } from 'hooks/useCredentials';

interface IWithAdminProps {
  children: ReactElement;
}

const WithAdmin: FC<IWithAdminProps> = ({ children }) => {
  const { isAuth, isAdmin } = useCredentials();

  if (isAuth && isAdmin) {
    return children;
  }

  if (isAuth && !isAdmin) {
    return <Navigate to={`${Routes.SHOP}`} />;
  }

  return <Navigate to={`/${Routes.LOGIN}`} />;
};

export default WithAdmin;
