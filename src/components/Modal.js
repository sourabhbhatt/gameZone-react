import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
                <button
                    onClick={onClose}
                    className="text-red-500 font-bold float-right text-xl"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
