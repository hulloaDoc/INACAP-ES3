function Navbar() {
    return (
        <nav className="navbar navbar-light bg-light px-3 shadow-sm">
            <span className="navbar-brand mb-0 h5">Mi Aplicación</span>
            <div className="d-flex align-items-center gap-2">
                <span className="text-muted">Usuario</span>
                <button className="btn btn-outline-secondary btn-sm" disabled>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
