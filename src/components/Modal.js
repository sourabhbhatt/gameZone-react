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
        className={`relative rounded-lg shadow-lg transition-transform transform ${modalStyles.className || ""
          }`}
        style={{
          backgroundColor: modalStyles.backgroundColor || "white",
          width: modalStyles.width || "90%", // Default for mobile
          maxWidth: modalStyles.maxWidth || "500px", // Limits width for desktop
          maxHeight: modalStyles.maxHeight || "90vh", // Ensures it doesn't exceed the viewport height
          padding: modalStyles.padding || "1.5rem",
          overflowY: "auto", // Makes content scrollable if it overflows
          position: "relative",
          ...modalStyles.style,
        }}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className={`absolute top-3 left-3 text-gray-600 hover:text-red-500 transition-transform transform hover:scale-110 
              ${closeButtonStyles.className || ""}`}
            style={{
              fontSize: closeButtonStyles.fontSize || "1.5rem",
              color: closeButtonStyles.color || "#333",
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
            className={`text-xl font-bold mt-6 text-left ${titleStyles.className || ""
              }`}
            style={{ color: titleStyles.color || "#333", ...titleStyles.style }}
          >
            {title}
          </h2>
        )}

        {/* Modal Content */}
        <div
          className={`mt-2  ${contentStyles.className || ""}`}
          style={contentStyles.style}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
