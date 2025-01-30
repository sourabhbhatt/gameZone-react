import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { X, O } from './GamePieces';

const popIn = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  60% {
    transform: scale(1.2) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
`;

const glow = keyframes`
  0% { filter: drop-shadow(0 0 2px #4CAF50); }
  50% { filter: drop-shadow(0 0 10px #4CAF50); }
  100% { filter: drop-shadow(0 0 2px #4CAF50); }
`;

const celebrate = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
`;

const drawLine = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const winAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const glowAnimation = keyframes`
  0% { filter: brightness(1); }
  50% { filter: brightness(1.5) drop-shadow(0 0 10px #4CAF50); }
  100% { filter: brightness(1); }
`;

const blastOut = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.5) rotate(45deg);
    opacity: 0.5;
  }
  100% {
    transform: scale(0) rotate(90deg);
    opacity: 0;
  }
`;

const BoardContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: min(300px, 90vw);
  aspect-ratio: 1;
  background: rgba(12, 20, 16, 0.4);
  border-radius: 24px;
  overflow: hidden;
  padding: 10px;
  z-index: 0;

  /* Pseudo-element for the gradient border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 24px;
    padding: 2.88px;
    background: linear-gradient(to bottom, #1f6c3c95, #152a1e, #244a32, #1f6c3c, #279455);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }

  /* Inner content styles */
  & > * {
    position: relative;
    z-index: 1;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
`;

const GridLine = styled.div`
  position: absolute;
  width: ${(props) => (props.horizontal ? '100%' : '1px')};
  height: ${(props) => (props.horizontal ? '1px' : '100%')};
  background: ${(props) =>
    props.horizontal
      ? 'linear-gradient(to left, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6))'
      : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6))'};
  left: ${(props) => props.left || '0px'};
  top: ${(props) => props.top || '0px'};
  transform: scaleX(${(props) => (props.horizontal ? '1' : '0')});
  transform-origin: ${(props) => (props.horizontal ? 'left' : 'top')};
  z-index: ${(props) => props.zIndex || 2};
  animation: ${drawLine} 1s ease-out forwards;

  &::before {
    content: '';
    position: absolute;
    width: ${(props) => (props.horizontal ? '100%' : '8px')};
    height: ${(props) => (props.horizontal ? '8px' : '100%')};
    background: rgba(0, 203, 74, 0.75);
    filter: blur(9.78px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    border-radius: 50%;
  }
`;

const Cell = styled(motion.div)`
  ${({ isWinning }) => isWinning && css`
    animation: ${celebrate} 0.5s ease-in-out;
  `}
  
  ${({ isLosing }) => isLosing && css`
    animation: ${blastOut} 0.5s ease-in-out forwards;
  `}
  
  ${({ isReplacing }) => isReplacing && css`
    animation: ${popIn} 0.5s ease-in-out 0.5s forwards;
  `}
  
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 2em;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  // &:hover {
  //   background: rgba(255, 255, 255, 0.1);
  //   border-radius: 12px;
  // }
`;

const WinningLine = styled.div`
  position: absolute;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  border-radius: 4px;
  z-index: 2;
  box-shadow: 0 0 10px #4CAF50;
`;

const TicTacToeBoard = ({ gameState = [], winningCombination = null, onMove }) => {
  const [displayState, setDisplayState] = useState(gameState);
  const [animationPhase, setAnimationPhase] = useState('initial'); // 'initial', 'blasting', 'replacing'
  
  useEffect(() => {
    if (winningCombination && gameState[winningCombination[0]]) {
      const winningSymbol = gameState[winningCombination[0]];
      
      // First update winning cells' animation
      setDisplayState([...gameState]);
      setAnimationPhase('blasting');
      
      // Then fill the board with winning symbol after the blast animation
      const replaceTimer = setTimeout(() => {
        // Create array with winning symbol in all positions
        const newState = Array(9).fill(winningSymbol);
        setDisplayState(newState);
        setAnimationPhase('replacing');
      }, 500); // After blast animation
      
      return () => clearTimeout(replaceTimer);
    } else {
      setDisplayState(gameState);
      setAnimationPhase('initial');
    }
  }, [winningCombination, gameState]);

  const isWinningCell = (index) => {
    if (!winningCombination) return false;
    return winningCombination.includes(index);
  };

  const isLosingCell = (index) => {
    if (!winningCombination || !displayState[index]) return false;
    const winningSymbol = gameState[winningCombination[0]];
    return displayState[index] !== winningSymbol && animationPhase === 'blasting';
  };

  const shouldShowSymbol = (index) => {
    if (animationPhase === 'initial') return displayState[index];
    if (animationPhase === 'blasting') {
      // During blasting, show original symbols
      return displayState[index];
    }
    if (animationPhase === 'replacing') {
      // During replacing, show winning symbol in all cells
      return displayState[index];
    }
    return displayState[index];
  };

  const renderCell = (index) => {
    const isWinning = isWinningCell(index);
    const isLosing = isLosingCell(index);
    const symbol = shouldShowSymbol(index);
    const isReplacing = animationPhase === 'replacing';

    return (
      <Cell
        key={index}
        isWinning={isWinning}
        isLosing={isLosing}
        isReplacing={isReplacing}
        onClick={() => !displayState[index] && onMove(index)}
      >
        {(symbol || animationPhase === 'replacing') && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: isReplacing ? index * 0.1 : 0 // Add delay based on index for replacing phase
              }
            }}
          >
            {symbol === 'X' ? <X /> : <O />}
          </motion.div>
        )}
      </Cell>
    );
  };

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const getWinningLine = () => {
    const margin = "15%"; // 20px margin from corners
 
 
   
   
    // Find which combination matches our current board state
    const matchingCombination = winningCombinations.find(combination => {
      const [a, b, c] = combination;
      return gameState[a] && 
             gameState[a] === gameState[b] && 
             gameState[a] === gameState[c];
    });
  
    if (!matchingCombination) return null;
  
    const [a, b, c] = matchingCombination;
  
    // Define the line styles for different combinations
    if (a === 0 && b === 1 && c === 2) {
      return { 
        top: "16.66%", 
        left: `${margin}`, 
        width: `70%`, 
        height: "4px", 
        transform: "translateY(-50%)" 
      };
    }
    if (a === 3 && b === 4 && c === 5) {
      return { 
        top: "50%", 
        left: `${margin}`, 
        width: `70%`, 
        height: "4px", 
        transform: "translateY(-50%)" 
      };

    }
    if (a === 6 && b === 7 && c === 8) {
      return { 
        top: "83.33%", 
        left: `${margin}`, 
        width: `70%`, 
        height: "4px", 
        transform: "translateY(-50%)" 
      };
    }
    if (a === 0 && b === 3 && c === 6) {
      return { 
        top: `${margin}`, 
        left: "16.66%", 
        width: "4px", 
        height: `70%`, 
        transform: "translateX(-50%)" 
      };
    }
    if (a === 1 && b === 4 && c === 7) {
      return { 
        top: `${margin}`, 
        left: "50%", 
        width: "4px", 
        height: `70%`, 
        transform: "translateX(-50%)" 
      };
    }
    if (a === 2 && b === 5 && c === 8) {
      return { 
        top: `${margin}`, 
        left: "83.33%", 
        width: "4px", 
        height: `70%`, 
        transform: "translateX(-50%)" 
      };
    }
    if (a === 0 && b === 4 && c === 8) {
      return {
        top: `${margin}`,
        left: `${margin}`,
        width: `100%`,
        height: "4px",
        transform: "rotate(44deg)",
        transformOrigin: "0 0",
      };
    }
    if (a === 2 && b === 4 && c === 6) {
      return {
        top: `${margin}`,
        right: `${margin}`,
        width: `100%`,
        height: "4px",
        transform: "rotate(-44deg)",
        transformOrigin: "100% 0",
      };
    }
    return null;
  };
  

  const lineStyle = getWinningLine();


  return (
    <BoardContainer>
      <GridContainer>
        {displayState.map((value, index) => (
          renderCell(index)
        ))}
      </GridContainer>
      
      <GridLine horizontal top="33.33%" />
      <GridLine horizontal top="66.67%" />
      <GridLine left="33.33%" />
      <GridLine left="66.67%" />
      
      {lineStyle && (
        <WinningLine style={lineStyle} className="absolute bg-white animate-drawLine animate-shine" />
      )}
    </BoardContainer>
  );
};

export default TicTacToeBoard;
