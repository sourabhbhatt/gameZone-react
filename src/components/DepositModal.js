import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWallet } from "../redux/slices/userSlice";

const DepositModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState(100);
  const dispatch = useDispatch();
  const walletAmount = useSelector((state) => state.user.wallet);

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (depositAmount > 0) {
      dispatch(updateWallet(walletAmount + depositAmount));
      onClose();
    } else {
      alert("Please enter a valid amount.");
    }
  };

  const handleSuggestionClick = (value) => {
    setAmount(value);
  };

  return (
    <div>
      {isOpen && (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Deposit Money</h2>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
          />

          <div className="flex space-x-4 mb-4">
            {[100, 500, 1000, 5000].map((value) => (
              <button
                key={value}
                onClick={() => handleSuggestionClick(value)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                ₹{value}
              </button>
            ))}
          </div>

          <button
            onClick={handleDeposit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Confirm Deposit
          </button>
        </div>
      )}
    </div>
  );
};

export default DepositModal;

/* 
// Modal Overlay 
.fixed {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}
// Modal Content 
.bg-white {
    max-width: 90%;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

*/
