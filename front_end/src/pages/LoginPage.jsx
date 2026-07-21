import LoginForm from '../components/LoginForm';

function LoginPage() {
    return (
        <section className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4">Iniciar sesión</h2>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
