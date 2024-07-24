import { Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";

export default function PlcDefaultValues({ variable, onWriteDefaultValue }) {
  return variable.DefaultValues.map((dv, index) => {
    return (
      <Button
        onClick={() => onWriteDefaultValue(variable, dv.Value)}
        variant="primary"
      >
        <Badge bg="secondary">{dv.Value}</Badge>
        {dv.Name}
      </Button>
    );
  });
}
