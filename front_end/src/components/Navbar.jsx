import useAuth from '../hooks/useAuth';

function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-3">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h4 fw-bold">Mi Aplicación</span>
                <div className="d-flex align-items-center ms-auto gap-2">
                    <span className="text-muted d-none d-sm-inline">{user?.username || 'Usuario'}</span>
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => logout()}
                        disabled={!isAuthenticated}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
