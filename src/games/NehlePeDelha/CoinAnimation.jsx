import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import coinImage from '../../assets/coin.png'; // Make sure to have a coin image in your assets

const CoinAnimation = ({ isAnimating, winner, currentBetAmount }) => {
  const centerY = window.innerHeight / 2;
  const centerX = window.innerWidth / 2;

  const getTargetY = () => {
    if (!winner) return centerY;
    return winner === 'Bot' ? 100 : window.innerHeight - 100;
  };

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed pointer-events-none"
          style={{
            width: '40px',
            height: '40px',
            zIndex: 1000,
          }}
          initial={{ 
            x: centerX, 
            y: window.innerHeight - 100,
            scale: 1,
            opacity: 1 
          }}
          animate={[
            // First move to center
            {
              x: centerX,
              y: centerY,
              transition: { duration: 0.5 }
            },
            // Then move to winner
            {
              x: centerX,
              y: getTargetY(),
              transition: { 
                duration: 0.5,
                delay: 1.5 // Delay to match card reveal timing
              }
            }
          ]}
          exit={{ opacity: 0 }}
        >
          <div className="relative">
            <img 
              src={coinImage} 
              alt="coin"
              className="w-full h-full object-contain"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500 font-bold text-sm">
              {currentBetAmount}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoinAnimation;
