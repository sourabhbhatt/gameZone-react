import React from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5"; // Import the cross icon
import HistoryCard from "./HistoryCard";

const BetHistoryModal = ({ isOpen, onClose, betHistory }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
      <div className="w-full max-h-[80vh] bg-gradient-to-t from-[#9C64E2] to-[#623AA2] rounded-t-3xl flex flex-col">
        <div className="sticky top-0 bg-transparent flex flex-col justify-between  p-4">
          <button onClick={onClose} className="text-white text-3xl">
            <IoClose />
          </button>
          <h2 className="text-white text-2xl font-bold py-2">Bet history</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-4">
          {betHistory.length > 0 ? (
            betHistory.map((history, index) => (
              <HistoryCard
                key={index}
                status={history.status}
                amount={history.amount}
                betDetails={history.betDetails}
              />
            ))
          ) : (
            <p className="text-white text-center">No bet history found.</p>
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
