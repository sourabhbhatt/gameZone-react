import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CountdownRevealModal = ({ isOpen, onReveal }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    let timer;

    if (isOpen) {
      setCount(3);
      timer = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 1) {
            clearInterval(timer);
            onReveal();
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isOpen, onReveal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative flex flex-col items-center justify-center  rounded-3xl p-6 w-[90%] max-w-sm">
        <p className="text-[#040404] font-semibold text-3xl mb-6">Revealing card in</p>
        <div className="flex items-center justify-center mb-6">
          <div className="text-[#040404] text-[72px] font-bold leading-none">
            {count}
          </div>
        </div>
      </div>
    </div>
  );
};

CountdownRevealModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onReveal: PropTypes.func.isRequired,
};

export default CountdownRevealModal;
