import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
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

export default function PokemonDetailPage() {
  const [pokemon, setPokemon] = useState();
  const [isModalShown, setIsModalShown] = useState(false);
  const { name } = useParams();
  const chance = Math.random() >= 0.5;

  const gqrVar = {
    name,
  };

  const saveMyPokemon = useStore(myPokemonSelector.saveMyPokemon);
  const { loading, data } = useQuery(Pokemon.GET_POKEMON_DETAIL, {
    variables: gqrVar,
  });

  function catchPokemon() {
    setIsModalShown(true);
  }

  function savePokemon(pokemon) {
    saveMyPokemon({
      id: pokemon.id,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      nickName: "tatang",
    });
    setIsModalShown(false);
  }

  const nickNameModalOptions = {
    message: "Gotcha! Pokemon caught! Please give it a nickname",
    cancelButton: "Cancel",
    submitButton: "Confirm",
  };

  const failedModalOptions = {
    message: "Failed to catch Pokemon...",
    cancelButton: "Close",
  };

  const pokemonDetailContainer = css`
    display: flex;
    align-items: center;
    border: 1px solid #49896f;
    margin: 0 auto;
    width: 90%;
    border-radius: 8px;
  `;

  const pokemonListContainer = css`
    border-left: 1px solid #49896f;
  `;

  const buttonCatch = css`
    font-size: 14px;
    display: block;
    width: 180px;
    color: white;
    padding: 12px 16px;
    border-radius: 4px;
    text-decoration: none;
    border: none;
    box-shadow: none;
    display: inline-block;
    margin: 24px auto;
    background-color: #49896f;
  `;

  useEffect(() => {
    if (data && !loading) {
      setPokemon(data.pokemon);
    }
  }, [loading, data]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {pokemon && (
        <>
          <h1 className={GeneralStyle.capitalize}>
            {StringUtils.removeDash(pokemon.name)}
          </h1>
          <div className={pokemonDetailContainer}>
            <div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
              />
            </div>
            <div className={pokemonListContainer}>
              <TypeList pokemon={pokemon} />
              <MoveList pokemon={pokemon} />
            </div>
          </div>

          <button className={buttonCatch} onClick={catchPokemon}>
            Catch Pokemon
          </button>
        </>
      )}
      {chance ? (
        <Modal
          show={isModalShown}
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
