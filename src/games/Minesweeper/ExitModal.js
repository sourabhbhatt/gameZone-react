import React, { memo } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const ExitModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50"
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full rounded-t-2xl p-6"
          style={{
            background: "linear-gradient(to top,  #5C59F1,#5C59F1)",
          }}
        >
          <div className="flex justify-start mb-4">
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-gray-400"
            >
              <IoMdClose size={25} />
            </button>
          </div>

          <h3 className="text-white text-lg font-semibold mb-6">
            Are you sure you want to quit the game?
          </h3>
          <div className="space-y-4">
            <button
              onClick={onClose}
              className="w-full py-3 bg-white text-[#4A2574] font-medium rounded-xl border border-[#4A2574] hover:bg-[#3A1C5F] transition"
              style={{ borderWidth: "1px" }}
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="w-full py-3 text-white font-medium rounded-xl border border-white hover:bg-white hover:text-[#4A2574] transition"
              style={{ borderWidth: "1px" }}
            >
              Yes, quit
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

ExitModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default memo(ExitModal);
