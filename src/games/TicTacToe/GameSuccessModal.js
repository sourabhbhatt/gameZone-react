import React from "react";
import winScreen from "./assets/winScreen.png";
import GameHeader from "../../components/GameHeader";
import { images } from "../../assets/images";
import PlayerInfo from "./PlayerInfo";
import { BiRefresh } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {useSelector} from "react-redux";
import close from "../../assets/Close.png";

const GlowingTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: bold;
  // font-family: "Outfit", sans-serif;
  width: 70%;
  line-height: 1.2;
  color: white;
  text-align: center;
  padding-right: 1rem;
  text-shadow: 
               -1px -1px 1px #429F63,  
                0 0 8px rgba(66, 159, 99, 0.9);
 color: white; /* The base color of the text */
  text-shadow: 
    -1px -1px 0 #429F63, /* Green outline - Top-left */
     1px -1px 0 #429F63, /* Green outline - Top-right */
    -1px  1px 0 #429F63, /* Green outline - Bottom-left */
     1px  1px 0 #429F63, /* Green outline - Bottom-right */
     0 0 16px white;    
}
  // animation: glow 1.5s ease-in-out infinite alternate;

  @keyframes glow {
    from {
      text-shadow: 0 0 1px rgba(255, 255, 255, 0.6),
                   0 0 3px rgba(255, 255, 255, 0.6),
                   0 0 5px rgba(255, 255, 255, 0.4),
                   -2px -2px 0 #429F63,  
                    2px -2px 0 #429F63,
                   -2px  2px 0 #429F63,
                    2px  2px 0 #429F63,
                   0 0 5px rgba(66, 159, 99, 0.2);
    }
    to {
      text-shadow: 0 0 2px rgba(255, 255, 255, 0.7),
                   0 0 6px rgba(255, 255, 255, 0.7),
                   0 0 10px rgba(255, 255, 255, 0.5),
                   -2px -2px 0 #429F63,  
                    2px -2px 0 #429F63,
                   -2px  2px 0 #429F63,
                    2px  2px 0 #429F63,
                   0 0 10px rgba(66, 159, 99, 0.4);
    }
  }
`;

const PlayAgainButton = styled.button`
  background: linear-gradient(to bottom, rgba(66, 159, 99, 0.7), rgba(66, 159, 99, 1));
  color: white;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  width: 90%;
  max-width: 400px;
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 50;
  
  &:before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    height: 50%;
    background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
    border-radius: 0.75rem 0.75rem 0 0;
  }

  &:active {
    transform: translateX(-50%) scale(0.98);
  }
`;

const RetryButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: rgba(42, 42, 42, 0.5);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: white;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`;

const CoinsBadge = styled.div`
  background: rgba(42, 42, 42, 0.5);
    font-family: "Outfit", sans-serif;

  padding: 0.5rem 1rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;


const CoinsBadgeModal = styled.div`
  background: rgba(255, 255, 255, 0.5);
  font-family: "Outfit", sans-serif;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;



const ScoreSection = styled.div`
  text-align: center;
    font-family: "Outfit", sans-serif;

  margin-top: 2rem;
  width: 100%;
  padding: 0 1rem;
`;

const ScoreDisplay = styled.div`
  display: flex;
  align-items: center;
    font-family: "Outfit", sans-serif;

  justify-content: center;
  
  max-width: 300px;
  margin: 1rem auto;
  margin-top: -50px
  padding: 1rem;
  // background: rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
`;

const PlayerScore = styled.div`
  display: flex;
  flex-direction: column;
    font-family: "Outfit", sans-serif;

  align-items: center;
  gap: 0.5rem;

  .score {
    font-size: 2rem;
    font-weight: bold;
    color: white;
  }
`;

const Divider = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin: 0 1rem;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  width: 50%;
  padding; 0 1rem;
  text-align: center;
  font-family: "Outfit", sans-serif;
  font-weight: 500;
  margin-top: 0.4rem;
`;

const headingInfo = {
  win: {
    title: "Slay! You Just Schooled The Bot ",
    description: "Congratulations! You outsmarted the bot.",
  },
  lose: {
    title: "Oops! The Bot Took The Dub ",
    description: "Play again and claim your win!",
  },
  tie: {
    title: "Stalemate! It's A Tie ",
    description: "You matched the bot move for move.",
  },
};

const GameSuccessModal = ({
  status = "win",
  resetGame = () => { },
  winnerDetails = {}
}) => {
  const { title, description } = headingInfo[status] || headingInfo.win;
  const navigate = useNavigate();
  const walletAmount = useSelector((state) => state.user?.wallet);

  return (
    <div
      className="fixed inset-0 flex flex-col text-white"
      style={{
        backgroundImage: `url(${winScreen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div>
      <button
          onClick={()=> {
            resetGame();
            navigate(-1);
          }}
          className="text-2xl text-white flex items-center justify-center w-10 h-10 bg-white bg-opacity-10 rounded-xl fixed top-4 left-4"
        >
        <img src={close} alt="Close" className="w-6 h-6 object-contain" /> 
        </button>
      </div>
   

      <div className="absolute top-4 right-4">
        <CoinsBadgeModal>
          <img src={images.coin} alt="coin" className="w-5 h-5" />
          <span className="text-sm font-bold -ml-1">{walletAmount}</span>
        </CoinsBadgeModal>
      </div>

      <div className="flex-1 flex flex-col items-center pt-12 mt-20">
        <GlowingTitle>{title}</GlowingTitle>

        <Subtitle>{description}</Subtitle>
        <PlayAgainButton onClick={() => {
        resetGame();
        navigate(-1);
      }}>
        <BiRefresh size={24} />
        Play again
      </PlayAgainButton>
        
        <ScoreSection>
          <h3 className="text-sm font-regular mb-2 tracking-[4px] mt-3 mb-3 font-outfit">COINS EARNED</h3>
          <div className="flex items-center justify-center ">
          <div className="flex items-center justify-center gap-2 mb-6 rounded-full bg-white bg-opacity-90 w-10 h-10 mb-2">
            <img src={images.coin} alt="coin" className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold mb-5 ml-2">  <GlowingTitle>{winnerDetails?.earnedCoins}</GlowingTitle></span>

          </div>
          <h3 className="text-sm font-regular -mb-4 tracking-[4px] -mt-2 font-outfit">OVERALL SCORE</h3>
          <ScoreDisplay>
            <PlayerScore>
              <span className="score">{winnerDetails?.playerScore}</span>
              <PlayerInfo
                name="You"
                avatar={require("../../assets/avatar.png")}
                isActive={true}
                scale={0.8}
              />
            </PlayerScore>
            <Divider>:</Divider>
            <PlayerScore>
              <span className="score">{winnerDetails?.botScore}</span>
              <PlayerInfo
                name="Bot"
                isBot
                isActive={false}
                scale={0.8}
              />
            </PlayerScore>
          </ScoreDisplay>

          {/* <p className="text-sm mt-4 text-gray-300">
            Your personal best is {winnerDetails?.personalBest}
          </p> */}
        </ScoreSection>
      </div>

 
    </div>
  );
};

export default React.memo(GameSuccessModal);
