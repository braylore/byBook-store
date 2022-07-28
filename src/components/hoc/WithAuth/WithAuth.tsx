import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Routes } from 'constants/routes';
import { useCredentials } from 'hooks/useCredentials';

interface IWithAuthProps {
  children: ReactElement;
}

const WithAuth: FC<IWithAuthProps> = ({ children }) => {
  const { isAuth } = useCredentials();

  if (!isAuth) {
    return <Navigate to={`/${Routes.LOGIN}`} />;
  }

  return children;
};

export default WithAuth;
