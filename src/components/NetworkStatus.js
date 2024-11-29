import React from "react";
import { useSelector } from "react-redux";

const NetworkStatus = ({ children }) => {
  const isOnline = useSelector((state) => state.app.connectionStatus.isOnline);

  if (!isOnline) {
    return (
      <div className="fixed bottom-0 w-full bg-white text-black text-center py-2 shadow-md">
        IT SEEMS LIKE YOU ARE DISCONNECTED
      </div>
    );
  }

  return children;
};

export default NetworkStatus;
