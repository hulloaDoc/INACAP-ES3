import LoginForm from '../components/LoginForm';
import useAuth from '../hooks/useAuth';

function LoginPage() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div className="container py-5">Cargando...</div>;
    }

    return (
        <section className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4">Iniciar sesión</h2>
                            {!isAuthenticated ? <LoginForm /> : <p className="text-center">Sesión activa</p>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
