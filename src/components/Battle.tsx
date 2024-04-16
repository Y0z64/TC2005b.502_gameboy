import { useEffect, useRef, useState } from "react";
import { Pokemon } from './Screen';

const battleBackgrounds: Record<string, string> = {
  grass:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f18eec73-a0af-43fe-a42a-9cce3f729e08/ddpvmlj-e8f6414c-5133-42bf-a713-db075029df20.png/v1/fill/w_400,h_225,q_80,strp/battlebgroute_by_aveontrainer_ddpvmlj-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI1IiwicGF0aCI6IlwvZlwvZjE4ZWVjNzMtYTBhZi00M2ZlLWE0MmEtOWNjZTNmNzI5ZTA4XC9kZHB2bWxqLWU4ZjY0MTRjLTUxMzMtNDJiZi1hNzEzLWRiMDc1MDI5ZGYyMC5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.q3QK6V-gVEz13QwGro2Wm1xclQweqWgMX27ywimSwwQ",
  forest:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f18eec73-a0af-43fe-a42a-9cce3f729e08/ddgp6yo-1a3ef049-4cf1-43e0-98d9-65e32fd75a84.png/v1/fill/w_400,h_225,q_80,strp/battlebgforest_by_aveontrainer_ddgp6yo-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI1IiwicGF0aCI6IlwvZlwvZjE4ZWVjNzMtYTBhZi00M2ZlLWE0MmEtOWNjZTNmNzI5ZTA4XC9kZGdwNnlvLTFhM2VmMDQ5LTRjZjEtNDNlMC05OGQ5LTY1ZTMyZmQ3NWE4NC5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.9l1j3PH8w3dd0VZMjqGDsBkh6Lj-wAQIxWv_tTIBBfc",
  beach:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f18eec73-a0af-43fe-a42a-9cce3f729e08/ddf9wly-72aab1e8-6029-44e6-b42c-74ea1efbb0e0.png/v1/fill/w_400,h_225,q_80,strp/battlebgbeach_by_aveontrainer_ddf9wly-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI1IiwicGF0aCI6IlwvZlwvZjE4ZWVjNzMtYTBhZi00M2ZlLWE0MmEtOWNjZTNmNzI5ZTA4XC9kZGY5d2x5LTcyYWFiMWU4LTYwMjktNDRlNi1iNDJjLTc0ZWExZWZiYjBlMC5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.rAAZoOQCKYdz8RoXxq95wpJq_vgry4feLbhlrMzuGyI",
  underwater:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f18eec73-a0af-43fe-a42a-9cce3f729e08/ddppsio-964c7ef5-5ca4-422b-8371-68ef42a36640.png/v1/fill/w_400,h_225,q_80,strp/battlebgdive_by_aveontrainer_ddppsio-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI1IiwicGF0aCI6IlwvZlwvZjE4ZWVjNzMtYTBhZi00M2ZlLWE0MmEtOWNjZTNmNzI5ZTA4XC9kZHBwc2lvLTk2NGM3ZWY1LTVjYTQtNDIyYi04MzcxLTY4ZWY0MmEzNjY0MC5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.azTQqS2Tro_B9zcAZWR1YFdbpcqtz8v03XsyTkhPiGE",
  desert:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f18eec73-a0af-43fe-a42a-9cce3f729e08/ddp4tzl-8b978830-8646-4458-837e-a8ace9ad89ce.png/v1/fill/w_400,h_225,q_80,strp/battlebgdesert_by_aveontrainer_ddp4tzl-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI1IiwicGF0aCI6IlwvZlwvZjE4ZWVjNzMtYTBhZi00M2ZlLWE0MmEtOWNjZTNmNzI5ZTA4XC9kZHA0dHpsLThiOTc4ODMwLTg2NDYtNDQ1OC04MzdlLWE4YWNlOWFkODljZS5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.mBy7weZZNgUqv_F7kzoK9412cmOkmisUh5r0fqT73CI",
  lava: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f18eec73-a0af-43fe-a42a-9cce3f729e08/ddfn6ec-920e0008-d687-4508-8191-dbe91c89bf6a.png/v1/fill/w_400,h_225,q_80,strp/battlebglava_by_aveontrainer_ddfn6ec-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI1IiwicGF0aCI6IlwvZlwvZjE4ZWVjNzMtYTBhZi00M2ZlLWE0MmEtOWNjZTNmNzI5ZTA4XC9kZGZuNmVjLTkyMGUwMDA4LWQ2ODctNDUwOC04MTkxLWRiZTkxYzg5YmY2YS5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.FC0Weo-hG1B0EpChAA51z76cCKHZvQmSAsz49f-K3Do",
  grasslands:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f18eec73-a0af-43fe-a42a-9cce3f729e08/ddpcj8m-d51d7b02-9c1f-4092-adc5-4e2d281e9b66.png/v1/fill/w_400,h_225,q_80,strp/battlebgwaterfall_by_aveontrainer_ddpcj8m-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI1IiwicGF0aCI6IlwvZlwvZjE4ZWVjNzMtYTBhZi00M2ZlLWE0MmEtOWNjZTNmNzI5ZTA4XC9kZHBjajhtLWQ1MWQ3YjAyLTljMWYtNDA5Mi1hZGM1LTRlMmQyODFlOWI2Ni5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.QzdwUTZMYqrWD5UGbZfzR37xFs2W3CgKbeaFA3CBh-k",
  mountain:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f18eec73-a0af-43fe-a42a-9cce3f729e08/dd2p518-9aa1b88b-087d-4fbb-acbf-e0b54ecfc268.png/v1/fill/w_400,h_225,q_80,strp/battlebgsnow_by_aveontrainer_dd2p518-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI1IiwicGF0aCI6IlwvZlwvZjE4ZWVjNzMtYTBhZi00M2ZlLWE0MmEtOWNjZTNmNzI5ZTA4XC9kZDJwNTE4LTlhYTFiODhiLTA4N2QtNGZiYi1hY2JmLWUwYjU0ZWNmYzI2OC5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.S2FijBCFzEherEqD1qG08-Y19jbCbXmZXIWrQjF5nj8",
  swamp:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f18eec73-a0af-43fe-a42a-9cce3f729e08/dd2p5b8-b519d090-828c-4181-ad34-28df33499e11.png/v1/fill/w_400,h_225,q_80,strp/battlebgswamp_by_aveontrainer_dd2p5b8-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI1IiwicGF0aCI6IlwvZlwvZjE4ZWVjNzMtYTBhZi00M2ZlLWE0MmEtOWNjZTNmNzI5ZTA4XC9kZDJwNWI4LWI1MTlkMDkwLTgyOGMtNDE4MS1hZDM0LTI4ZGYzMzQ5OWUxMS5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.xgm2T4Ym2lKwZonWLZoAZKt974_n9GVbkNA-bJyKRV8",
  savana:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f18eec73-a0af-43fe-a42a-9cce3f729e08/ddp4lix-924f73c1-78c2-46df-9b9e-634ea891cbef.png/v1/fill/w_400,h_225,q_80,strp/battlebgsafari_by_aveontrainer_ddp4lix-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI1IiwicGF0aCI6IlwvZlwvZjE4ZWVjNzMtYTBhZi00M2ZlLWE0MmEtOWNjZTNmNzI5ZTA4XC9kZHA0bGl4LTkyNGY3M2MxLTc4YzItNDZkZi05YjllLTYzNGVhODkxY2JlZi5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.9ycfrb92sookgYIVubfVROdLQhwdlD6GOHq-3dNWds4",
  cementery:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f18eec73-a0af-43fe-a42a-9cce3f729e08/ddppssh-d33de708-7b8b-401c-bf8c-3814702a1aa9.png/v1/fill/w_400,h_225,q_80,strp/battlebggraveyard_by_aveontrainer_ddppssh-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI1IiwicGF0aCI6IlwvZlwvZjE4ZWVjNzMtYTBhZi00M2ZlLWE0MmEtOWNjZTNmNzI5ZTA4XC9kZHBwc3NoLWQzM2RlNzA4LTdiOGItNDAxYy1iZjhjLTM4MTQ3MDJhMWFhOS5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.he5iVC_HongZiGSoIIetEhtW0Oqw6wJlKc-7qXh6plc",
  bamboo:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f18eec73-a0af-43fe-a42a-9cce3f729e08/ddq1ff0-9f7922e3-c1c4-450a-9939-b085fae958ef.png/v1/fill/w_400,h_225,q_80,strp/battlebgbamboo_by_aveontrainer_ddq1ff0-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI1IiwicGF0aCI6IlwvZlwvZjE4ZWVjNzMtYTBhZi00M2ZlLWE0MmEtOWNjZTNmNzI5ZTA4XC9kZHExZmYwLTlmNzkyMmUzLWMxYzQtNDUwYS05OTM5LWIwODVmYWU5NThlZi5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.kwABiY8BSpUKYFuBd3SMKxPnxQu7c6HJE8Sja71DNZ4",
};

type Props = {
  chosenPokemon: Pokemon;
};

export default function Battle({ chosenPokemon }: Props) {
  const [action, setAction] = useState<string>("");
  const currentAction = useRef<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    currentAction.current = action;
  }, [action]);

  const getRandomBackground = () => {
    const keys = Object.keys(battleBackgrounds);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return battleBackgrounds[randomKey];
  };

  useEffect(() => {
    const randomBackground = getRandomBackground();
    setBackgroundImage(randomBackground);
  }, []);

  return (
    <div id="battle-wrapper">
      <div
        id="pokemon-wrapper"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div
          className="current-poke-display"
          style={{
            backgroundImage: `url(${chosenPokemon.sprites.backSprite})`,
          }}
        ></div>
        <div
          className="other-poke-display"
          style={{
            backgroundImage: `url(${chosenPokemon.sprites.backSprite})`,
          }}
        ></div>
      </div>
      <div className="battle-inferface">
        <div className="blattle-interface-wrapper">
          <div className="blattle-text">
            {!action ? (
              <button className="battle-start-button">Start</button>
            ) : (
              <p className="battle-text-wrapper">action</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
