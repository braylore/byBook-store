import { useAppSelector } from './redux';

export const useCredentials = () => {
  const { id, email } = useAppSelector((state) => state.userReducer);

  return {
    id,
    email,
    isAuth: !!email,
    isAdmin: id === process.env.REACT_APP_USERADMINID
  };
};
