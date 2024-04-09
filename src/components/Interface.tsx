export default function Interface() {
  return (
    <div id="interface">
      <div className="control-wrapper">
        <div id="dpad-wrapper">
          <button id={"button-1"} className="dpad-button"></button>
          <button id={"button-2"} className="dpad-button"></button>
          <button id={"button-3"} className="dpad-button"></button>
          <button id={"button-4"} className="dpad-button"></button>
        </div>
        <div id="buttons">
          <div className="button-wrapper">
            <div className="red-button-wrapper">
              <div className="red-button" id="A"></div>
              <div className="red-button-text">A</div>
            </div>
            <div className="red-button-wrapper">
              {" "}
              <div className="red-button" id="B"></div>
              <div className="red-button-text">B</div>
            </div>
          </div>
        </div>
      </div>
      <div id="lower-interface">
        <div className="pause-button-wrapper">
          <button className="pause-button" id="select"></button>
          <div className="pause-button-text">select</div>
        </div>
        <div className="pause-button-wrapper">
          <button className="pause-button" id="start"></button>
          <div className="pause-button-text">start</div>
        </div>
      </div>
    </div>
  );
}
