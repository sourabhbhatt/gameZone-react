import React from 'react';
import './GameSettings.css';

const GameSettings = ({ gridSize, setGridSize, riskLevel, setRiskLevel }) => {
  return (
    <div className="game-settings">
      <div className="setting-option">
        <label>Grid Size:</label>
        <select value={gridSize} onChange={(e) => setGridSize(parseInt(e.target.value))}>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
          <option value={6}>6x6</option>
          <option value={8}>8x8</option>
        </select>
      </div>

      <div className="setting-option">
        <label>Risk Level:</label>
        <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
          <option value="hard">Hard Level</option>
        </select>
      </div>
    </div>
  );
};

export default GameSettings;
