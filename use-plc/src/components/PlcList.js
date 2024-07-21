import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

function PlcList({ variables, dispatch }) {
  return (
    <ListGroup as="ol">
      {variables.map((variable) => (
        <ListGroup.Item as="li" key={variable.Name}>
          <div>
            <div className="fw-bold">{variable.Name}</div>
            <div className="plcInfoContainer">
              <ul>
                <li>
                  <div>
                    <FontAwesomeIcon size="1x" icon={faMicrochip} />{" "}
                    {variable.DB}
                  </div>
                </li>
                <li>
                  <div>
                    <FontAwesomeIcon size="1x" icon={faMicrochip} />{" "}
                    {variable.Type}
                  </div>
                </li>
                <li>
                  <div>
                    <FontAwesomeIcon size="1x" icon={faMicrochip} />{" "}
                    {variable.Address}
                  </div>
                </li>
              </ul>
              <Button
                onClick={() => dispatch({ type: "read", payload: variable })}
                variant="success">
                Read
              </Button>
              <Button variant="danger">Write</Button>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default PlcList;
