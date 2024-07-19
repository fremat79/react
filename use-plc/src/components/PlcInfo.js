import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";

function PlcInfo({ info }) {
  return (
    <li>
      <div className="summary">
        <FontAwesomeIcon size="3x" icon={faMicrochip} />
        <h2>{info.host}</h2>
        <button className="button-33">Connect</button>
        <button className="button-66">Disconnect</button>
      </div>
    </li>
  );
}

export default PlcInfo;
