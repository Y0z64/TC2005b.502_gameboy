import { Pokemon } from "./Screen";
import { forwardRef, HTMLAttributes, RefAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> &
  RefAttributes<HTMLDivElement> & {
    pokemon: Pokemon;
    handleSelectecPokemon: (pokemon: Pokemon) => void;
  };

const Card = forwardRef<HTMLDivElement, Props>(({ pokemon, handleSelectecPokemon, ...props }, ref) => {
  return (
    <div className="poke-card" ref={ref} onClick={() => handleSelectecPokemon(pokemon)} {...props}>
      <img
        src={pokemon.sprites.frontSprite}
        alt={pokemon.name + " sprite"}
        className="poke-sprite"
      />
      <p className="poke-name">{pokemon.name}</p>
    </div>
  );
});

export default Card;
