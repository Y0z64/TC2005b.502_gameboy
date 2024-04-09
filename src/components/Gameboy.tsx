import Screen from './Screen';
import Interface from './Interface';

export default function Gameboy() {
  return (
    <div id="gameboy" className="bordered">
      <Screen />
      <Interface/>
    </div>
  );
}