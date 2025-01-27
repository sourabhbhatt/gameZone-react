import React from 'react';
import styled, { keyframes } from 'styled-components';
import ZeroSvg from '../assets/Zero.png';
import CrossSvg from '../assets/Cross.png';

const drawCircle = keyframes`
  from {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(0);
    opacity: 1;
  }
`;

const drawCross = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const PieceContainer = styled.div`
  width: 80.3px;  /* Increased by 30% from 61.76px */
  height: 83.2px; /* Increased by 30% from 64px */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PieceContainerCross = styled.div`
  width: 80.3px;  /* Increased by 30% from 61.76px */
  height: 83.2px; /* Increased by 30% from 64px */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  scale: 1;
  object-fit: contain; /* Better compatibility */
  animation: ${props => props.$isO ? drawCircle : drawCross} 0.3s ease-out forwards;
`;

// for cross enlarge omage by 1.3x
const StyledImageCross = styled.img`
  width: 100%;
  height: 100%;
  scale: 1.2;
  object-fit: contain; /* Better compatibility */
  animation: ${drawCross} 0.3s ease-out forwards;
`;

export const O = () => (
  <PieceContainer>
    <StyledImage src={ZeroSvg} alt="O" $isO={true} />
  </PieceContainer>
);

export const X = () => (
  <PieceContainerCross>
    <StyledImageCross src={CrossSvg} alt="X" $isO={false} />
  </PieceContainerCross>
);
