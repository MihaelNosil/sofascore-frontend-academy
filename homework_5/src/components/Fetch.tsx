import React, { useEffect, useState } from "react";

const getPokemonUrl = (id: number) =>
  `https://pokeapi.co/api/v2/pokemon/${id}/`;

// we only care about these two fields
interface PokemonResponse {
  id: number;
  name: string;
}

export default function Fetch() {
  const [pokemon, setPokemon] = useState<PokemonResponse[]>([]);
  // your task here is to fetch Pokémon from a given URL and just display its name
  // first Pokémon should be fetched when the compontent is first rendered
  // then, once user clicks on FETCH button, increment your id to fetch the next one and add it to the list

  // fetch works just as it worked in plain JavaScript, the only difference is you need to specify what the
  // type of the object is, after converting it to .json()
  // e.g. code snippet
  const fetchPokemon = async (id: number): Promise<PokemonResponse> => {
    const response = await fetch(getPokemonUrl(id));
    const data: PokemonResponse = await response.json();
    return data;
  };

  // fetches the next Pokémon and adds it to the list
  const fetchNextPokemon = async () => {
    const nextId = pokemon.length + 1;
    const newPokemon = await fetchPokemon(nextId);
    setPokemon([...pokemon, newPokemon]);
  };

  // fetch the first Pokémon when the component mounts
  useEffect(() => {
    fetchPokemon(1).then((p) => setPokemon([p]));
  }, []);

  // return 2 elements:
  // 1st: a button which will trigger another fetch on click, for a Pokémon with next id
  // 2nd: All Pokémon stored in your list
  return (
    <div>
      <button onClick={fetchNextPokemon}>FETCH</button>
      {pokemon.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
