export enum ValidationErrorMsg {
  REQUIRED = 'Поле обязательно к заполнению',
  EMAIL = 'Некорректный email',
  MIN_LEN_PASS = 'Не менее 6 символов',
  MAX_LEN_PASS = 'Не более 25 символов',
  CYRILLIC = 'Поле не может содержать кириллицу',
  NUMBERS = 'Значение не может быть ниже 1',
  MIN_LEN_DESC = 'Не менее 20 символов',
  MAX_LEN_DESC = 'Не более 1000 символов'
}

const regExps = {
  cyrillic: /[а-я]/i,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
};

export const emailValidation = {
  required: ValidationErrorMsg.REQUIRED,
  validate: {
    cyrillic: (v: string) => {
      if (regExps.cyrillic.test(v)) {
        return ValidationErrorMsg.CYRILLIC;
      }
      return true;
    },
    email: (v: string) => {
      if (!regExps.email.test(v)) {
        return ValidationErrorMsg.EMAIL;
      }
      return true;
    }
  }
};

export const passwordValidation = {
  required: ValidationErrorMsg.REQUIRED,
  minLength: { value: 6, message: ValidationErrorMsg.MIN_LEN_PASS },
  maxLength: { value: 25, message: ValidationErrorMsg.MAX_LEN_PASS },
  validate: {
    cyrillic: (v: string) => {
      if (regExps.cyrillic.test(v)) {
        return ValidationErrorMsg.CYRILLIC;
      }
      return true;
    }
  }
};

export const numberValidation = {
  required: ValidationErrorMsg.REQUIRED,
  min: { value: 1, message: ValidationErrorMsg.NUMBERS }
};

export const descriptionValidation = {
  required: ValidationErrorMsg.REQUIRED,
  minLength: { value: 20, message: ValidationErrorMsg.MIN_LEN_DESC },
  maxLength: { value: 1000, message: ValidationErrorMsg.MAX_LEN_DESC }
};
