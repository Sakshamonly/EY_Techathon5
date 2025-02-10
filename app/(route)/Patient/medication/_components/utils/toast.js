import { toast as hotToast } from 'react-hot-toast';

export const toast = {
  success: (message) => {
    hotToast.success(message, {
      style: {
        background: '#10B981',
        color: '#fff',
      },
      duration: 3000,
    });
  },
  warning: (message) => {
    hotToast.error(message, {
      style: {
        background: '#EF4444',
        color: '#fff',
      },
      duration: 3000,
    });
  },
};
