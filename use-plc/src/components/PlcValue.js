import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef, useState } from "react";

function PlcValue({ onWriteVariable, variable, dispatch }) {
  const valueRef = useRef(0);
  const [isValid, setIsValid] = useState(true);
  function handleWriteClick() {
    const value = valueRef.current.value;
    // Step 2: Check if the value is valid (e.g., not empty)
    if (!value) {
      setIsValid(false); // Update state to indicate invalid input
      return; // Prevent further execution
    }
    setIsValid(true); // Reset validation state on valid input
    onWriteVariable(variable, valueRef.current.value);
  }

  return (
    variable && (
      <ListGroup as="ol">
        <ListGroup.Item
          onClick={() => dispatch({ type: "select", payLoad: variable })}
          as="li"
          className="plcValueInfo"
          key={variable.Name}>
          <div> </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{variable.Name}</Form.Label>
              <Form.Control
                isInvalid={!isValid} // Step 1: Add validation state as
                required
                ref={valueRef}
                placeholder="insert value here"
              />
              <Form.Control.Feedback type="invalid">
                Please insert a value.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Button onClick={() => handleWriteClick()} variant="danger">
            Write
          </Button>
        </ListGroup.Item>
      </ListGroup>
    )
  );
}

export default PlcValue;
