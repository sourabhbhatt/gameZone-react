import React from "react";
import { FaRobot } from "react-icons/fa";
import styled from "styled-components";
import xImage from "../../assets/Cross.png";
import oImage from "../../assets/Zero.png";
import bot from "../../assets/bot.png";

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
  margin-left: 1rem;
`;

const AvatarContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  // border: 1px solid ${props => props.isActive ? '#2ED573' : '#4A4A4A'};
  transition: all 0.3s ease;
  margin-bottom: -0.25rem;
    &::before {
    content: '';
  width: 3.2rem;
  height: 3rem;
    position: absolute;
    inset: 0;
    padding: 1px;
    left: -26px;
    border-radius: 100%;
background: ${props =>
    props.isActive
      ? "linear-gradient(to top, rgba(39, 148, 85, 0.6), rgba(31, 108, 60, 0.6), rgba(36, 74, 50, 0.6), rgba(21, 42, 30, 0.6), rgba(31, 108, 60, 0.6))"
      : "linear-gradient(to top, transparent, transparent, #244a32, #152a1e, #ffffff90)"};
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;

const ChoiceContainer = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)}; /* Adjust opacity for the gradient */

  display: flex;
  justify-content: center;
  align-items: center;
  // background: rgba(0, 30, 28, 0.9);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: 0.75rem;
    background: linear-gradient(to bottom, #1f6c3c95, #152a1e, #244a32, #1f6c3c, #279455);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;

const ChoiceContainerTwo = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  display: flex;
  
  justify-content: center;
  align-items: center;
  background: #688f521a;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    opacity: ${(props) => (props.isActive ? 1 : 0.5)}; /* Adjust opacity for the gradient */
    border-radius: 0.75rem;
    background: linear-gradient(to bottom, #1f6c3c95, #152a1e, #244a32, #1f6c3c, #279455);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;


const PlayerName = styled.div`
  background: linear-gradient(to bottom, #ffffff95, #ffffff40, #00000011, #00000010, #00000001);
  padding: 0.1rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  color: ${props => props.isActive ? '#ffffff' : '#808080'};
  // text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ChoiceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: ${props => props.isActive ? 1 : 0.4};
`;

const PlayerInfo = ({ name, avatar, isActive, choice, isBot = false }) => {
  return (
    <PlayerContainer>
      <div className="flex flex-col items-center">
        <AvatarContainer isActive={isActive}>
          {isBot ? (
            <img src={bot} alt={name} className="w-6 h-6 rounded-full" />
          ) : (
            <img src={avatar} alt={name} className="w-[95%] h-[95%] rounded-full" />
          )}
        </AvatarContainer>
        <PlayerName isActive={isActive}>
          {name}
        </PlayerName>
      </div>

      {!!choice && (

        <ChoiceContainerTwo isActive={isActive}>
          <ChoiceContainer isActive={isActive}>
            <ChoiceImage
              src={choice === 'X' ? xImage : oImage}
              alt={choice}
              isActive={isActive}
            />
          </ChoiceContainer>
        </ChoiceContainerTwo>


      )}
    </PlayerContainer>
  );
};

export default PlayerInfo;
