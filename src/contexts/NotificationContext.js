// src/contexts/NotificationContext.js
import React, { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const showNotification = (type, message, options = {}) => {
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

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};
