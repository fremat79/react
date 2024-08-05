import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import PlcDefaultValues from "./PlcDefaultValues";

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
  function handleWriteDefaultValue(plcVariable, value) {
    onWriteVariable(variable, value);
    //dispatch({ type: "refresh" });
  }

  return (
    variable && (
      <ListGroup as="ol">
        <ListGroup.Item
          onClick={() => dispatch({ type: "select", payLoad: variable })}
          as="li"
          className="plcValueInfo"
          key={variable.Name}
        >
          {variable.DefaultValues?.length === 0 && (
            <>
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
            </>
          )}
          {variable?.DefaultValues?.length > 0 && (
            <Stack direction="vertical" gap={3}>
              <PlcDefaultValues
                onWriteDefaultValue={handleWriteDefaultValue}
                variable={variable}
              />
            </Stack>
          )}
        </ListGroup.Item>
      </ListGroup>
    )
  );
}

export default PlcValue;
