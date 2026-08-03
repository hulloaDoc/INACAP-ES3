import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
        backgroundColor: "#0b57d0",
        color: "white",
        marginBottom: "20px",
      }}
    >
      <div>
        <h2>INACAP - Inventario de Tienda</h2>

        {user && (
          <>
            <p>
              <strong>Usuario:</strong> {user.nombre}
            </p>

            <p>
              <strong>Rol:</strong> {user.rol}
            </p>

            <p>
              <strong>Correo:</strong> {user.correo}
            </p>
          </>
        )}
      </div>

      {user && (
        <div style={{ textAlign: "center" }}>
          <img
            src={user.avatar}
            alt="Avatar"
            width="80"
            style={{ borderRadius: "50%" }}
          />

          <br />
          <br />

          <button onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;