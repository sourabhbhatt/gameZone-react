import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import store from "./redux/store";
import NetworkStatus from "./components/NetworkStatus";
import ErrorBoundary from "./components/ErrorBoundary";
import { NotificationProvider } from "../src/contexts/NotificationContext";

// Lazy load game components
const GameZone = lazy(() => import("./components/GameZone"));
const NotFound = lazy(() => import("./components/NotFound"));
const Fallback = lazy(() => import("./components/Fallback"));

const Ludo = lazy(() => import("./games/Ludo/Ludo"));
const MinesweeperLoading = lazy(() => import("./games/Minesweeper"));
const MinesweeperGame = lazy(() => import("./games/Minesweeper/Minesweeper"));
const FruitNinja = lazy(() => import("./games/FruitNinja/FruitNinja"));
const TeenPatti = lazy(() => import("./games/TeenPatti/TeenPatti"));

const TicTacToe = lazy(() => import("./games/TicTacToe"));
const TicTacToeGame = lazy(() => import("./games/TicTacToe/TicTacToeGame"));

const NehlePeDelha = lazy(() => import("./games/NehlePeDelha"));
const NehlePeDelhaGame = lazy(() =>
  import("./games/NehlePeDelha/NehlePeDelhaGame")
);

const env = process.env.NODE_ENV; // Get the environment (development or production)

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <Router>
          <ErrorBoundary env={env}>
            <Suspense fallback={<Fallback />}>
              <Routes>
                <Route path="/" element={<GameZone />} />

                <Route path="/tictactoe" element={<TicTacToe />} />
                <Route path="/tictactoe-game" element={<TicTacToeGame />} />

                <Route path="/nehlepedelha" element={<NehlePeDelha />} />
                <Route
                  path="/nehlepedelha-game"
                  element={<NehlePeDelhaGame />}
                />
                <Route path="/minesweeper" element={<MinesweeperLoading />} />
                <Route path="/minesweeper-game" element={<MinesweeperGame />} />

                <Route path="/ludo" element={<Ludo />} />
                <Route path="/fruit-ninja" element={<FruitNinja />} />
                <Route path="/teen-patti" element={<TeenPatti />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </Router>
        <NetworkStatus />
      </NotificationProvider>
    </Provider>
  );
}

export default App;
