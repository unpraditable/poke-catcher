import PokemonCard from "../Components/PokemonCard";
import "./PokemonList.css";
import PokemonDetailStyle from "../StyleClasses/PokemonDetailStyle";
import useStore from "../StateManager/UseStore";
import { myPokemonSelector } from "../StateManager/MyPokemon/MyPokemonReducer";
import { useEffect, useState } from "react";
import Modal from "../Components/Modals/Modal";
import { useRef } from "react/cjs/react.development";
import Toast from "../Components/Toasts/Toast";

export default function MyPokemonListPage() {
  const myPokemons = useStore(myPokemonSelector.getMyPokemon);
  const indexChosen = useRef();
  const releaseMyPokemon = useStore(myPokemonSelector.releaseMyPokemon);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isToastShown, setIsToastShown] = useState(false);
  const message = useRef();

  const modalOptions = {
    message: message.current,
    cancelButton: "No",
    submitButton: "Yes",
  };

  function releasePokemon(index) {
    setIsModalShown(false);
    setIsToastShown(true);
    releaseMyPokemon(index);
  }

  function openModal(index, nickname, name) {
    message.current = `Are you sure you want to release ${nickname} (${name}) ?`;
    setIsModalShown(true);
    indexChosen.current = index;
  }

  useEffect(() => {
    if (isToastShown) {
      setTimeout(() => {
        setIsToastShown(false);
      }, 5000);
    }
  }, [isToastShown]);
  return (
    <>
      <Toast
        isToastShown={isToastShown}
        message="Pokemon has been released..."
      />
      <h1>My Pokemon Collection</h1>

      <ul className={PokemonDetailStyle.ulClass}>
        {myPokemons.length > 0 &&
          myPokemons.map((pokemon, i) => (
            <PokemonCard
              key={i}
              pokemon={pokemon}
              nickName={pokemon.nickName}
              release={() => openModal(i, pokemon.nickName, pokemon.name)}
            />
          ))}
      </ul>
      {isModalShown && (
        <Modal
          options={modalOptions}
          show={isModalShown}
          handleClose={() => setIsModalShown(false)}
          handleSubmit={() => releasePokemon(indexChosen.current)}
          danger={true}
        />
      )}
    </>
  );
}
