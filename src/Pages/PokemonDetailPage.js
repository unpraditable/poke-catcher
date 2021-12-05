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
          <button onClick={catchPokemon}>Catch Pokemon</button>
          <h1 className={GeneralStyle.capitalize}>
            {StringUtils.removeDash(pokemon.name)}
          </h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
          />
          <TypeList pokemon={pokemon} />
          <MoveList pokemon={pokemon} />

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
        </>
      )}
    </div>
  );
}
