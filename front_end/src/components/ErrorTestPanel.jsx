function ErrorTestPanel({
  onTest400,
  onTest404,
  onTest500,
  testingError,
}) {
  return (
    <details className="error-test-panel">
      <summary>
        🧪 Panel de pruebas de errores HTTP
      </summary>

      <div className="error-test-panel__content">
        <p>
          Estas pruebas permiten comprobar que Axios captura los errores sin
          congelar la aplicación.
        </p>

        <div className="error-test-panel__buttons">
          <button
            type="button"
            className="test-button"
            onClick={onTest400}
            disabled={Boolean(testingError)}
          >
            {testingError === '400'
              ? 'Probando...'
              : 'Simular error 400'}
          </button>

          <button
            type="button"
            className="test-button"
            onClick={onTest404}
            disabled={Boolean(testingError)}
          >
            {testingError === '404'
              ? 'Probando...'
              : 'Simular error 404'}
          </button>

          <button
            type="button"
            className="test-button test-button--danger"
            onClick={onTest500}
            disabled={Boolean(testingError)}
          >
            {testingError === '500'
              ? 'Probando...'
              : 'Simular error 500'}
          </button>
        </div>
      </div>
    </details>
  );
}

export default ErrorTestPanel;