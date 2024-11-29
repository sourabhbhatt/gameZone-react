import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  modalStyles = {},
  contentStyles = {},
  titleStyles = {},
  closeButtonStyles = {},
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`rounded-lg shadow-lg relative ${modalStyles.className || ""}`}
        style={{
          backgroundColor: modalStyles.backgroundColor || "white",
          width: modalStyles.width || "80%",
          maxWidth: modalStyles.maxWidth || "600px",
          padding: modalStyles.padding || "1.5rem",
          ...modalStyles.style,
        }}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className={`text-gray-600 hover:text-red-500 transition-transform transform hover:scale-110 ${
              closeButtonStyles.className || ""
            }`}
            style={{
              fontSize: closeButtonStyles.fontSize || "1.5rem",
              ...closeButtonStyles.style,
            }}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Title */}
        {title && (
          <h2
            className={`text-xl font-bold mt-4 ${titleStyles.className || ""}`}
            style={{ color: titleStyles.color || "#333", ...titleStyles.style }}
          >
            {title}
          </h2>
        )}

        {/* Modal Content */}
        <div className={`mt-6 ${contentStyles.className || ""}`} style={contentStyles.style}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
