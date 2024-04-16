import { useCallback, useEffect, useRef, useState } from "react";
import Card from "./Card";

type Response = {
  count: number;
  next: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Pokemon = {
  name: string;
  frontSprite: string;
  id: number;
};

type PokemonResponse = {
  id: number;
  sprites: {
    front_default: string;
  };
};

export default function Screen() {
  const limit: number = 9;
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const lastPokemonElementRef = useRef<HTMLDivElement | null>(null);

  const pokeUrl = "https://pokeapi.co/api/v2/pokemon?limit=" + limit;

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
          name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
          frontSprite: extendedPokemon.sprites.front_default,
          id: extendedPokemon.id,
        };
      })
    );

    console.log(pokemons);
    return { pokemons, next: data.next };
  };

  const loadMore = useCallback(async () => {
    if (nextUrl) {
      const { pokemons, next } = await fetchData(nextUrl);
      setPokemons((prevPokemons) => [...prevPokemons, ...pokemons]);
      setNextUrl(next);
    }
  }, [nextUrl]);

  useEffect(() => {
    (async () => {
      const { pokemons, next } = await fetchData(pokeUrl);
      setPokemons(pokemons);
      setNextUrl(next);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let observerRefValue = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );
    if (lastPokemonElementRef.current) {
      observer.observe(lastPokemonElementRef.current);
      observerRefValue = lastPokemonElementRef.current;
    }
    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [loadMore]);

  return (
    <div id="screen" className="bordered">
      {pokemons.length > 0 ? (
        pokemons.map((pokemon: Pokemon, index: number) => (
          <Card
            pokemon={pokemon}
            ref={index === pokemons.length - 1 ? lastPokemonElementRef : null}
          />
        ))
      ) : (
        <h3 className="loading">Loading...</h3>
      )}
    </div>
  );
}
