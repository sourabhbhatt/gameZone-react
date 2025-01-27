import styled, { keyframes } from 'styled-components';

const glowPulse = keyframes`
  0% {
    opacity: 0.5;
    filter: blur(4px);
  }
  50% {
    opacity: 0.8;
    filter: blur(6px);
  }
  100% {
    opacity: 0.5;
    filter: blur(4px);
  }
`;

export const GlowDot = styled.div`
  position: absolute;
  width: ${props => props.size || '2.88px'};
  height: ${props => props.size || '2.88px'};
  left: ${props => props.left};
  top: ${props => props.top};
  background: rgba(162, 255, 194, ${props => props.opacity || 0.2});
  animation: ${glowPulse} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

export const GlowRing = styled.div`
  position: absolute;
  width: ${props => props.size || '346.03px'};
  height: ${props => props.height || '17.28px'};
  left: calc(50% - ${props => props.size || '346.03px'}/2 ${props => props.offsetX || '+ 466.3px'});
  top: ${props => props.top};
  background: linear-gradient(180deg, #072110 0%, #072110 44.73%, #021609 73.18%, #010D05 100%);
  border: ${props => props.borderWidth || '0.610901px'} solid #38FF7E;
  transform: ${props => props.transform || 'matrix(-0.98, 0.2, 0.2, 0.98, 0, 0)'};
  opacity: ${props => props.opacity || 1};
  filter: blur(${props => props.blur || '0px'});
`;
