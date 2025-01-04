import React from "react";
import { Link, useLocation } from "react-router-dom";

const LinkWithQuery = ({ to, children, ...props }) => {
  const location = useLocation();

  // Parse current query parameters
  const currentSearchParams = new URLSearchParams(location.search);

  // Construct the new link with existing query parameters
  const newUrl = new URL(to, window.location.origin);
  const targetSearchParams = new URLSearchParams(newUrl.search);

  // Merge current query parameters into the new link
  for (const [key, value] of currentSearchParams.entries()) {
    if (!targetSearchParams.has(key)) {
      targetSearchParams.append(key, value);
    }
  }

  // Update the `to` prop with the full path and merged query parameters
  const fullPath = `${newUrl.pathname}?${targetSearchParams.toString()}`;

  return (
    <Link to={fullPath} {...props}>
      {children}
    </Link>
  );
};

export default LinkWithQuery;
