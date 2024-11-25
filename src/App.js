import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import store from "./redux/store";
import Header from "./components/Header";
import GameZone from "./components/GameZone";
import ErrorBoundary from "./components/ErrorBoundary";
import { NotificationProvider } from "../src/contexts/NotificationContext";
import TicTacToeGame from "./games/TicTacToe/TicTacToeGame";

// Lazy load game components
const Ludo = lazy(() => import("./games/Ludo/Ludo"));
const Minesweeper = lazy(() => import("./games/Minesweeper/Minesweeper"));
const FruitNinja = lazy(() => import("./games/FruitNinja/FruitNinja"));
const TicTacToe = lazy(() => import("./games/TicTacToe/TicTacToe"));
const TeenPatti = lazy(() => import("./games/TeenPatti/TeenPatti"));
const NehlePeDelha = lazy(() => import("./games/NehlePeDelha"));

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <Router>
          {/* <Header /> */}
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<GameZone />} />

                <Route path="/tic-tac-toe" element={<TicTacToe />} />
                <Route path="/tictactoe-game" element={<TicTacToeGame />} />

                <Route path="/ludo" element={<Ludo />} />
                <Route path="/minesweeper" element={<Minesweeper />} />
                <Route path="/fruit-ninja" element={<FruitNinja />} />
                <Route path="/teen-patti" element={<TeenPatti />} />
                <Route path="/nehle-pe-delha" element={<NehlePeDelha />} />
                <Route path="*" element={<div>Page Not Found</div>} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </Router>
      </NotificationProvider>
    </Provider>
  );
}

export default App;
