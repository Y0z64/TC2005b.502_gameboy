import { Pokemon } from "./Screen";
import { forwardRef, HTMLAttributes, RefAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> &
  RefAttributes<HTMLDivElement> & {
    pokemon: Pokemon;
  };

const Card = forwardRef<HTMLDivElement, Props>(({ pokemon, ...props }, ref) => {
  return (
    <div className="poke-card" ref={ref} {...props}>
      <img
        src={pokemon.frontSprite}
        alt={pokemon.name + " sprite"}
        className="poke-sprite"
      />
      <p className="poke-name">{pokemon.name}</p>
    </div>
  );
});

export default Card;
