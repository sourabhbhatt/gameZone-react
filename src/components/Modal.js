import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { images } from "../assets/images";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  modalStyles = {},
  contentStyles = {},
  titleStyles = {},
  closeButtonStyles = {},
  bgImage,
}) => {

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div
        className={`relative rounded-lg shadow-lg transition-transform transform ${
          modalStyles.className || ""
        }`}
        style={{
          backgroundColor: modalStyles.backgroundColor || "white",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          width: modalStyles.width || "100%", // Default for mobile
          maxWidth: modalStyles.maxWidth || "500px", // Limits width for desktop
          maxHeight: modalStyles.maxHeight || "90vh", // Ensures it doesn't exceed the viewport height
          padding: modalStyles.padding || "1.5rem",
          overflowY: "auto", // Makes content scrollable if it overflows
          position: "relative",
          ...modalStyles.style,
        }}
      >
        {/* Close Button */}
        <div className="mt-[5px]">
          <button
            onClick={onClose}
            className={`text-gray-600 hover:text-red-500 transition-transform transform hover:scale-110 
              ${closeButtonStyles.className || ""}`}
            style={{
              fontSize: closeButtonStyles.fontSize || "1.5rem",
              color: closeButtonStyles.color || "white",
              ...closeButtonStyles.style,
            }}
            aria-label="Close"
          >
            <img src={images.cross} className="h-[24px] w-[24px]" />
          </button>
          {/* Title */}
          {title && (
            <h2
              className={`text-[24px] font-outfit font-semibold mt-1 text-left ${
                titleStyles.className || ""
              }`}
              style={{
                color: titleStyles.color || "#333",
                ...titleStyles.style,
              }}
            >
              {title}
            </h2>
          )}
        </div>

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
