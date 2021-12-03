import "./App.css";
import PokemonListPage from "./Pages/PokemonListPage";
import PokemonDetailPage from "./Pages/PokemonDetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <h1>Hello, React Router!</h1>
          <Routes>
            <Route path="/" element={<PokemonListPage />} />
            <Route path=":name" element={<PokemonDetailPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
