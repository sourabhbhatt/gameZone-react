import { useLocation } from "react-router-dom";
import extractQueryParams from "../utils/extractQueryParams";

const useUrlParams = () => {
  const location = useLocation();

  // Retrieve URL params from the current location
  const getCurrentParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const params = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  };

  // Retrieve stored URL params from localStorage
  const getUrlParams = () => {
    const paramsString = localStorage.getItem("urlParams");
    return paramsString ? JSON.parse(paramsString) : {};
  };

  // Store or update URL params in localStorage
  const setParams = (newParams) => {
    const currentParams = extractQueryParams();
    console.log("currentParams", currentParams);
    const updatedParams = { ...currentParams, ...newParams };
    const paramsString = JSON.stringify(updatedParams);
    localStorage.setItem("urlParams", paramsString);
  };

  return { getCurrentParams, getUrlParams, setParams };
};

export default useUrlParams;
