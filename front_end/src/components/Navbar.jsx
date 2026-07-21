import useAuth from '../hooks/useAuth';

function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="navbar navbar-light bg-light px-3 shadow-sm">
            <span className="navbar-brand mb-0 h5">Mi Aplicación</span>
            <div className="d-flex align-items-center gap-2">
                <span className="text-muted">{user?.username || 'Usuario'}</span>
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => logout()}
                    disabled={!isAuthenticated}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
