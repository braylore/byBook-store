import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Routes } from 'constants/routes';
import { useCredentials } from 'hooks/useCredentials';

interface IWithNonAuthProps {
  children: ReactElement;
}

const WithNonAuth: FC<IWithNonAuthProps> = ({ children }) => {
  const { isAuth } = useCredentials();

  if (isAuth) {
    return <Navigate to={Routes.SHOP} />;
  }

  return children;
};

export default WithNonAuth;
