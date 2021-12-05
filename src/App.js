import "./App.css";
import PokemonListPage from "./Pages/PokemonListPage";
import PokemonDetailPage from "./Pages/PokemonDetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPokemonListPage from "./Pages/MyPokemonListPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<PokemonListPage />} />
            <Route path="/MyPokemonList" element={<MyPokemonListPage />} />

            <Route path=":name" element={<PokemonDetailPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
