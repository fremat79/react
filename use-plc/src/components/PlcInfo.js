import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";

function PlcInfo({ info, dispatch }) {
  return (
    <li>
      <div className="summary">
        <FontAwesomeIcon size="3x" icon={faMicrochip} />
        <h2>{info.host}</h2>
        <button variant="success">Connect</button>
        <button variant="danger">Disconnect</button>
      </div>
    </li>
  );
}

export default PlcInfo;
