function PlcValue({ variable, value }) {
  return (
    variable && (
      <div className="value">
        <h3>{variable.Name}</h3>
        <p>value {value}</p>
      </div>
    )
  );
}

export default PlcValue;
