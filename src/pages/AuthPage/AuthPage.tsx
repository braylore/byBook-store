import AuthForm from 'components/AuthForm/AuthForm';
import { useLocation } from 'react-router-dom';
import { Routes } from 'constants/routes';
import { Backdrop, CircularProgress, Alert, AlertTitle } from '@mui/material';
import { useEffect } from 'react';
import { getFormattedAuthError } from 'utils/getFormattedAuthError';
import AuthQuestionBar from 'components/AuthQuestionBar/AuthQuestionBar';
import { useAuth } from 'hooks/useAuth';

const AuthPage = () => {
  const { pathname } = useLocation();
  const isLogin = pathname === `/${Routes.LOGIN}`;
  const { authError, handleAuth, isAuthLoading, setAuthError } = useAuth(isLogin);

  useEffect(() => {
    if (authError) {
      setAuthError('');
    }
  }, [pathname]);

  const { errorMsg, errorTitle } = getFormattedAuthError(authError);

  return (
    <>
      <Backdrop
        sx={{
          zIndex: '9000'
        }}
        open={isAuthLoading}
      >
        <CircularProgress color="info" />
      </Backdrop>
      {isLogin ? (
        <AuthForm
          title="Авторизация"
          label="Войти"
          handleAuth={handleAuth}
        >
          <AuthQuestionBar
            linkText="Создайте!"
            path={`/${Routes.REGISTRATION}`}
            title="Нет аккаунта?"
          />
        </AuthForm>
      ) : (
        <AuthForm
          title="Регистрация"
          label="Зарегистрироваться"
          handleAuth={handleAuth}
        >
          <AuthQuestionBar
            linkText="Авторизуйтесь!"
            path={`/${Routes.LOGIN}`}
            title="Уже есть аккаунт?"
          />
        </AuthForm>
      )}
      {authError && (
        <Alert
          closeText="Закрыть"
          onClose={() => setAuthError('')}
          sx={{
            maxWidth: '500px',
            m: '15px auto'
          }}
          severity="error"
        >
          <AlertTitle>{errorTitle}</AlertTitle>
          {errorMsg}
        </Alert>
      )}
    </>
  );
};

export default AuthPage;
