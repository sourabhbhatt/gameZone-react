import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConnectionStatus } from "../redux/slices/appSlice";

const useConnectionListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOnline = () => dispatch(setConnectionStatus(true));
    const handleOffline = () => dispatch(setConnectionStatus(false));

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch]);
};

export default useConnectionListener;
