import { toast } from 'react-toastify';

export const notify = (toastType: 'error' | 'success', msg: string, theme: 'light' | 'dark') => {
  toast[toastType](msg, {
    position: 'top-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme
  });
};
