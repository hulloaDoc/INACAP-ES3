function ErrorAlert({ mensaje }) {
  if (!mensaje) return null;

  return (
    <div
      style={{
        backgroundColor: "#ffdddd",
        color: "#a10000",
        border: "1px solid red",
        padding: "12px",
        margin: "15px 0",
        borderRadius: "5px",
        fontWeight: "bold",
      }}
    >
      {mensaje}
    </div>
  );
}

export default ErrorAlert;