import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faFont } from "@fortawesome/free-solid-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

export function PlcVariable({ variable, index, dispatch }) {
  return (
    <li key={index}>
      <h3>{variable.Name}</h3>
      <p>
        <FontAwesomeIcon size="2x" icon={faLocationCrosshairs} />
        <span>{variable.DB}</span>
      </p>
      <p>
        <FontAwesomeIcon size="2x" icon={faFont} />
        <span>{variable.Type}</span>
      </p>
      <p>
        <FontAwesomeIcon size="2x" icon={faMapLocationDot} />
        <span>{variable.Address}</span>
      </p>

      <button
        onClick={() => dispatch({ type: "read", payload: variable })}
        className="read-button button-33">
        Read
      </button>
      <button className="write-button button-66">Write</button>
    </li>
  );
}
