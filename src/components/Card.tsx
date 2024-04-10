import { Pokemon } from "./Screen"

type Props = {
  pokemon: Pokemon;
}

export default function Card({pokemon}: Props) {
  return (
    <div className="poke-card">
      <img src={pokemon.sprite} alt={pokemon.name + " sprite"} className="poke-sprite"/>
      <p className="poke-name">{pokemon.name}</p>
    </div>
  )
}