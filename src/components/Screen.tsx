import { useEffect, useState } from "react";
import Card from "./Card";

type Response = {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
};

export type Pokemon = {
  name: string;
  sprite: string;
  id: number;
};

type PokemonResponse = {
  id: number;
  sprites: {
    front_default: string;
  };
};

export default function Screen() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const pokeUrl = "https://pokeapi.co/api/v2/pokemon?limit=9";

  const fetchData = async (url: string) => {
    const data: Response = await fetch(url).then((response) => response.json());

    console.log("Data: ", data);

    const pokemons: Pokemon[] = await Promise.all(
      data.results.map(async (pokemon) => {
        const extendedPokemon: PokemonResponse = await fetch(pokemon.url).then(
          (response) => response.json()
        );
        console.log("ExtendedPokemon: ", extendedPokemon);
        return {
          name: pokemon.name,
          sprite: extendedPokemon.sprites.front_default,
          id: extendedPokemon.id,
        };
      })
    );

    console.log(pokemons);
    return pokemons;
  };

  useEffect(() => {
    (async () => {
      const pokemons = await fetchData(pokeUrl);
      setPokemons(pokemons);
    })();
  }, []);

  return (
    <div id="screen" className="bordered">
      {pokemons.map((pokemon) => 
        <Card pokemon={pokemon} />
      )}
    </div>
  );
}
