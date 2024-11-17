import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBars, FaCoins } from "react-icons/fa"; // Import coin icon
import { useSelector } from "react-redux";
import Modal from "./Modal";
import DepositModal from "./DepositModal";

const Header = () => {
    const walletAmount = useSelector((state) => state.user.wallet);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

    const openModal = () => setIsDepositModalOpen(true);
    const closeModal = () => setIsDepositModalOpen(false);

    return (
        <header className="w-full bg-gray-100 py-4 px-6 flex items-center justify-between shadow-md">
            {/* Home Button */}
            <Link to="/" className="flex items-center space-x-2">
                <FaHome className="text-xl text-blue-600" />
                <span className="text-lg font-semibold text-blue-600">Home</span>
            </Link>

            {/* Title in the Center */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 text-center">
                Welcome to GameZone
            </h1>

            {/* Right Side: Wallet, Deposit Button, and Menu */}
            <div className="flex items-center space-x-4">
                {/* Wallet Amount */}
                <div className="flex items-center space-x-2 bg-blue-100 bg-opacity-50 px-4 py-2 rounded-lg shadow-md">
                    <FaCoins className="text-yellow-500 text-xl" />
                    <div className="text-lg font-semibold text-blue-600">
                        ₹{walletAmount}
                    </div>
                </div>

                {/* Deposit Money Button */}
                <button
                    onClick={openModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Deposit Money
                </button>

                {/* Menu Option */}
                <button className="flex items-center space-x-2">
                    <FaBars className="text-xl text-blue-600" />
                    <span className="text-lg text-blue-600">Menu</span>
                </button>
            </div>

            {/* Deposit Modal */}
            <Modal isOpen={isDepositModalOpen} onClose={closeModal}>
                <DepositModal isOpen={isDepositModalOpen} onClose={closeModal} />
            </Modal>
        </header>
    );
};

export default Header;
