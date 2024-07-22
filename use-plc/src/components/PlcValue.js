import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef } from "react";

function PlcValue({ onWriteVariable, variable, dispatch }) {
  const valueRef = useRef(0);
  return (
    variable && (
      <ListGroup as="ol">
        <ListGroup.Item
          onClick={() => dispatch({ type: "select", payLoad: variable })}
          as="li"
          key={variable.Name}>
          <div> </div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{variable.Name}</Form.Label>
              <Form.Control ref={valueRef} placeholder="insert value here" />
            </Form.Group>
          </Form>
          <Button
            onClick={() => onWriteVariable(variable, valueRef.current.value)}
            variant="danger">
            Write
          </Button>
        </ListGroup.Item>
      </ListGroup>
    )
  );
}

export default PlcValue;
