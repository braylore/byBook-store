import { useState } from 'react';
import { setUser } from 'store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserBasket } from 'store/slices/basketSlice';
import { IAuthForm } from 'components/AuthForm/AuthForm';
import { useAppDispatch } from './redux';

export const useAuth = (isLogin: boolean) => {
  const auth = getAuth();
  const [isAuthLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const dispatch = useAppDispatch();

  let handleAuth;

  if (isLogin) {
    handleAuth = (data: IAuthForm) => {
      setAuthLoading(true);
      setAuthError('');
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(({ user }) => {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid
            })
          );
          dispatch(createUserBasket({ userId: user.uid, totalAmount: 0, totalPrice: 0, userBasket: [] }));
        })
        .catch((e) => setAuthError(e.message))
        .finally(() => setAuthLoading(false));
    };
  } else {
    handleAuth = (data: IAuthForm) => {
      setAuthLoading(true);
      setAuthError('');
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(({ user }) => {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid
            })
          );
          dispatch(createUserBasket({ userId: user.uid, totalAmount: 0, totalPrice: 0, userBasket: [] }));
        })
        .catch((e) => setAuthError(e.message))
        .finally(() => setAuthLoading(false));
    };
  }

  return {
    isAuthLoading,
    authError,
    setAuthError,
    handleAuth
  };
};
