import { PlcVariable } from "./PlcVariable"; // Import the PlcVariable component

export default function PlcVariableContainer({ dispatch, variables }) {
  return (
    <ul className="list list-movies">
      {variables.map((variable, index) => (
        <PlcVariable dispatch={dispatch} key={index} variable={variable} />
      ))}
    </ul>
  );
}
