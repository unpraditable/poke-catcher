import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Pokemon from "../Queries/Pokemon";
import StringUtils from "../Utils/StringUtils";
import MoveList from "../Components/MoveList";
import GeneralStyle from "../StyleClasses/GeneralStyle";
import TypeList from "../Components/TypeList";
import useStore from "../StateManager/UseStore";
import { myPokemonSelector } from "../StateManager/MyPokemon/MyPokemonReducer";
import Modal from "../Components/Modals/Modal";
import { css } from "@emotion/css";
import Toast from "../Components/Toasts/Toast";
import PokemonDetailStyle from "../StyleClasses/PokemonDetailStyle";

export default function PokemonDetailPage() {
  const [pokemon, setPokemon] = useState();
  const [isModalShown, setIsModalShown] = useState(false);
  const [isToastShown, setIsToastShown] = useState(false);
  const { name } = useParams();
  const inputModalRef = useRef();
  const chance = Math.random() >= 0.5;

  const gqrVar = {
    name,
  };

  const saveMyPokemon = useStore(myPokemonSelector.saveMyPokemon);
  const { loading, data } = useQuery(Pokemon.GET_POKEMON_DETAIL, {
    variables: gqrVar,
  });

  const nickNameModalOptions = {
    message: "Gotcha! Pokemon caught! Please give it a nickname",
    cancelButton: "Cancel",
    submitButton: "Confirm",
  };

  const failedModalOptions = {
    message: "Failed to catch Pokemon...",
    cancelButton: "Close",
  };

  function catchPokemon() {
    setIsModalShown(true);
  }

  function savePokemon(pokemon) {
    const inputNickname = inputModalRef.current["nickName"].value;
    saveMyPokemon({
      id: pokemon.id,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      nickName: inputNickname,
    });
    setIsModalShown(false);
    setIsToastShown(true);
  }

  useEffect(() => {
    if (data && !loading) {
      setPokemon(data.pokemon);
    }
  }, [loading, data]);

  useEffect(() => {
    if (isToastShown) {
      setTimeout(() => {
        setIsToastShown(false);
      }, 5000);
    }
  }, [isToastShown]);

  return (
    <div>
      <Toast
        isToastShown={isToastShown}
        message="Pokemon saved to My Pokemon List"
      />

      {loading && <p>Loading...</p>}
      {pokemon && (
        <>
          <h1 className={GeneralStyle.capitalize}>
            {StringUtils.removeDash(pokemon.name)}
          </h1>
          <div className={PokemonDetailStyle.pokemonDetailContainer}>
            <div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
              />
            </div>
            <div className={PokemonDetailStyle.pokemonListContainer}>
              <TypeList pokemon={pokemon} />
              <MoveList pokemon={pokemon} />
            </div>
          </div>

          <button
            className={PokemonDetailStyle.buttonCatch}
            onClick={catchPokemon}
          >
            Catch Pokemon
          </button>
        </>
      )}
      {chance ? (
        <Modal
          inputRef={inputModalRef}
          show={isModalShown}
          withInput={true}
          options={nickNameModalOptions}
          handleClose={() => setIsModalShown(false)}
          handleSubmit={() => savePokemon(pokemon)}
        />
      ) : (
        <Modal
          show={isModalShown}
          options={failedModalOptions}
          handleClose={() => setIsModalShown(false)}
        />
      )}
    </div>
  );
}
