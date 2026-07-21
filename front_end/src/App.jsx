import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import useAuth from './hooks/useAuth';

function App() {
    const { isAuthenticated, isLoading } = useAuth();

    return (
        <div className="app-shell">
            <Navbar />
            <main className="app-main">
                {isLoading ? <div className="container py-4">Cargando...</div> : isAuthenticated ? <Dashboard /> : <LoginPage />}
            </main>
            <Footer />
        </div>
    );
}

export default App;
