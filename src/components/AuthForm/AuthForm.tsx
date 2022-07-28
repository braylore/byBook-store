import {
  Button,
  ButtonProps,
  IconButton,
  InputAdornment,
  Paper,
  PaperProps,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { emailValidation, passwordValidation } from 'validation';
import { useLocation } from 'react-router-dom';
import { Email, Visibility, VisibilityOff } from '@mui/icons-material';

const Wrapper = styled((props: PaperProps) => <Paper {...props} />)({
  margin: '20px auto 0 auto',
  padding: '16px',
  maxWidth: '500px'
});

const Btn = styled((props: ButtonProps) => (
  <Button
    variant="outlined"
    size="medium"
    color="inherit"
    type="submit"
    {...props}
  />
))({
  margin: '8px auto 0 auto',
  display: 'block',
  width: '75%',
  fontWeight: '500',
  fontSize: '16px'
});

export interface IAuthForm {
  email: string;
  password: string;
}

interface IAuthProps {
  title: string;
  label: string;
  children: ReactElement;
  handleAuth: (data: IAuthForm) => void;
}

const AuthForm: FC<IAuthProps> = ({ handleAuth, title, label, children }) => {
  const { control, handleSubmit, reset } = useForm<IAuthForm>({ mode: 'onBlur' });
  const { pathname } = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    handleAuth(data);
  };

  useEffect(() => {
    reset();
  }, [pathname]);

  return (
    <>
      <Wrapper elevation={4}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            textAlign: 'center'
          }}
        >
          {title}
        </Typography>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            rules={emailValidation}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                margin="normal"
                variant="filled"
                fullWidth
                value={field.value || ''}
                onChange={(e) => field.onChange(e)}
                placeholder="Введите email"
                label="Email"
                helperText={error?.message || ' '}
                error={!!error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          <Controller
            name="password"
            rules={passwordValidation}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                margin="normal"
                variant="filled"
                fullWidth
                type={!showPassword ? 'password' : 'text'}
                value={field.value || ''}
                onChange={(e) => field.onChange(e)}
                placeholder="Введите пароль"
                label="Пароль"
                helperText={error?.message || ' '}
                error={!!error?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          <Btn>{label}</Btn>
        </form>
      </Wrapper>
      <Wrapper elevation={2}>{children}</Wrapper>
    </>
  );
};

export default AuthForm;
