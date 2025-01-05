
import { toast } from "react-toastify";

/**
 * Utility function to show notifications using react-toastify.
 *
 * @param {string} type - Type of notification ('info', 'success', 'warning', 'error').
 * @param {string} message - The message to display in the notification.
 * @param {object} options - Optional configuration for the toast notification.
 */
export const showToastMessage = (type, message, options = {}) => {
  const toastConfig = {
    ...options,
    position: options.position || "top-right",
    autoClose: options.autoClose !== undefined ? options.autoClose : 5000,
    pauseOnHover: true,
    draggable: true,
  };

  switch (type) {
    case "info":
      toast.info(message, toastConfig);
      break;
    case "success":
      toast.success(message, toastConfig);
      break;
    case "warning":
      toast.warn(message, toastConfig);
      break;
    case "error":
      toast.error(message, toastConfig);
      break;
    default:
      toast(message, toastConfig);
  }
};


export function formatINRLocale(num) {
    if (num === null || num === undefined || isNaN(num)) {
        return '0';
    }
    return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0 // Remove decimals
    }).format(num);
}