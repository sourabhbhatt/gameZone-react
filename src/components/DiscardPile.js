import { motion } from "framer-motion";
import PlayingCard from "../components/PlayingCard"; 
import { memo } from "react";

const DiscardPile = ({ currentTrick }) => {
  return (
    <div className="relative row-start-2 col-start-2 w-[150px] h-[150px] flex justify-center items-center shadow-inner shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] md:w-[225px] md:h-[225px]">
      <div className="relative w-full h-full">
        {currentTrick.map((card, index) => {
          const topPosition = `30%`;
          const leftPosition = `50%`;
          const randomRotation = Math.random() * 30 - 15;
          const airEffect = {
            x: Math.random() * 40 - 20,
            y: Math.random() * 40 - 20,
            rotate: randomRotation + 15,
          };

          return (
            <motion.div
              key={index}
              className="absolute w-[65px] h-[100px] bg-white border-2 border-[#f2b01e] rounded-lg flex justify-center items-center shadow-lg"
              style={{
                top: topPosition,
                left: leftPosition,
                zIndex: index + 1,
                transform: `translate(-50%, -50%) rotate(${randomRotation}deg)`,
              }}
              initial={{ scale: 0, opacity: 0, ...airEffect }}
              animate={{
                scale: 1,
                opacity: 1,
                x: 0,
                y: 0,
                rotate: randomRotation,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.2,
              }}
            >
              <PlayingCard suit={card.suit} value={card.value} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(DiscardPile);
