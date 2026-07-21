function ErrorAlert({ mensaje }) {
  if (!mensaje) {
    return null;
  }

  return (
    <div className="error-alert" role="alert">
      {mensaje}
    </div>
  );
}

export default ErrorAlert;
