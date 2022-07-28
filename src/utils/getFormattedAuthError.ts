export const getFormattedAuthError = (error: string) => {
  const errorObj = {
    errorTitle: 'Ошибка',
    errorMsg: 'Ошибка авторизации/регистрации'
  };
  if (error.includes('wrong-password')) {
    errorObj.errorTitle = 'Ошибка авторизации';
    errorObj.errorMsg = 'Неверный пароль';
    return errorObj;
  }
  if (error.includes('too-many-requests')) {
    errorObj.errorTitle = 'Ошибка авторизации';
    errorObj.errorMsg = `Доступ к этому аккаунту был временно отключен из-за многочисленных неудачных попыток входа 
    в систему. Пожалуйста повторите попытку позднее`;
    return errorObj;
  }
  if (error.includes('user-not-found')) {
    errorObj.errorTitle = 'Ошибка авторизации';
    errorObj.errorMsg = 'Такого пользователя не существует';
    return errorObj;
  }
  if (error.includes('email-already-in-use')) {
    errorObj.errorTitle = 'Ошибка регистрации';
    errorObj.errorMsg = 'Email уже используется';
    return errorObj;
  }
  if (error.includes('network-request-failed')) {
    errorObj.errorTitle = 'Ошибка сети';
    errorObj.errorMsg = 'Сбой сетевого запроса';
    return errorObj;
  }
  return errorObj;
};
