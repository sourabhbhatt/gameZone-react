import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5"; // Import the cross icon
import HistoryCard from "./HistoryCard";

const BetHistoryModal = ({ isOpen, onClose, betHistory }) => {
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
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-end z-50"
      style={{ touchAction: "none" }} // Prevent mobile gestures from interfering
    >
      <div
        className="w-full h-full pb-5 bg-gradient-to-t from-[#9C64E2] to-[#623AA2] rounded-t-3xl flex flex-col"
        style={{
          WebkitOverflowScrolling: "touch", // Enable smooth scrolling for iOS
          maxHeight: "60vh", // Set maximum height
          minHeight: "30vh",
          height: "auto",
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-transparent  items-center justify-between p-4 z-10">
          <button onClick={onClose} className="text-white text-3xl">
            <IoClose />
          </button>
          <h2 className="text-white text-[24px] font-semiBold font-outfit">
            Bet history
          </h2>
        </div>

        {/* Scrollable Content */}
        <div
          className="flex-1 overflow-y-auto px-4 py-2 space-y-4"
          style={{
            maxHeight: "calc(80vh - 30px)", // Deduct header height from the total height
          }}
        >
          {betHistory.length > 0 ? (
            betHistory.map((history, index) => (
              <HistoryCard
                key={index}
                status={history.status}
                amount={history.amount}
                betDetails={history.betDetails}
                isLastCard={index === betHistory.length - 1}
              />
            ))
          ) : (
            <p className="text-white font-outfit font-regular text-center">
              No bet history found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

BetHistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  betHistory: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(["Won", "Loss"]).isRequired,
      amount: PropTypes.number.isRequired,
      betDetails: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BetHistoryModal;
