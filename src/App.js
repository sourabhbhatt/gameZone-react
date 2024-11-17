// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameZone from "./components/GameZone";
import Ludo from "./games/Ludo/Ludo";
import Minesweeper from "./games/Minesweeper/Minesweeper";
import FruitNinja from "./games/FruitNinja/FruitNinja";
import TicTacToe from "./games/TicTacToe/TicTacToe";
import Header from "./components/Header";
import TeenPatti from "./games/TeenPatti/TeenPatti";
import NehlePeDelha from "./games/NehlePeDelha";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<GameZone />} />
            <Route path="/ludo" element={<Ludo />} />
            <Route path="/minesweeper" element={<Minesweeper />} />
            <Route path="/fruit-ninja" element={<FruitNinja />} />
            <Route path="/TicTacToe" element={<TicTacToe />} />
            <Route path="/TeenPatti" element={<TeenPatti />} />
            <Route path="/NehlePeDelha" element={<NehlePeDelha />} />
          </Routes>
        </main>
      </Router>
    </Provider>
  );
}

export default App;
