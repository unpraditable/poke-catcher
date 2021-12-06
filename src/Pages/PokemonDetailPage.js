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
import Toast from "../Components/Toasts/Toast";
import PokemonDetailStyle from "../StyleClasses/PokemonDetailStyle";
import ArrUtils from "../Utils/ArrUtils";

export default function PokemonDetailPage() {
  const [pokemon, setPokemon] = useState();
  const [isModalShown, setIsModalShown] = useState(false);
  const [isToastShown, setIsToastShown] = useState(false);
  const [inputError, setInputError] = useState(false);
  const { name } = useParams();
  const inputModalRef = useRef();
  const chance = useRef(false);
  const nickNameList = useRef([]);

  const gqrVar = {
    name,
  };

  const saveMyPokemon = useStore(myPokemonSelector.saveMyPokemon);
  const myPokemonList = useStore(myPokemonSelector.getMyPokemon);

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
    chance.current = Math.random() >= 0.5;
    setIsModalShown(true);
  }

  function savePokemon(pokemon) {
    const inputNickname = inputModalRef.current["nickName"].value;
    switch (true) {
      case !inputNickname:
        setInputError("Nickname Must Not Empty");
        break;
      case nickNameList.current.includes(inputNickname):
        setInputError("This nickname already exist");
        break;
      default:
        saveMyPokemon({
          id: pokemon.id,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
          nickName: inputNickname,
        });
        setIsModalShown(false);
        setIsToastShown(true);
        setInputError(false);
        inputModalRef.current.reset();
        break;
    }
  }

  function handleClose() {
    setInputError(false);
    setIsModalShown(false);
    if (inputModalRef.current) {
      inputModalRef.current.reset();
    }
  }

  useEffect(() => {
    const arr = ArrUtils.groupBy(myPokemonList, "name");
    if (pokemon && arr[pokemon.name]) {
      const concatedArray = arr[pokemon.name].reduce(
        (previousValue, currentValue) => {
          return [...previousValue, currentValue.nickName];
        },
        []
      );
      nickNameList.current.push(...concatedArray);
    }
  }, [pokemon, myPokemonList]);

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
      {chance.current ? (
        <Modal
          inputRef={inputModalRef}
          show={isModalShown}
          withInput={true}
          inputError={inputError}
          options={nickNameModalOptions}
          handleClose={() => handleClose(false)}
          handleSubmit={() => savePokemon(pokemon)}
        />
      ) : (
        <Modal
          show={isModalShown}
          options={failedModalOptions}
          handleClose={() => handleClose()}
        />
      )}
    </div>
  );
}
