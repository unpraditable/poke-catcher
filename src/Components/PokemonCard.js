export default function PokemonCard({pokemon}) {
  return (
    <div>
      <img src={pokemon.image} />
      <p>{pokemon.name}</p>
    </div>
  );
}
