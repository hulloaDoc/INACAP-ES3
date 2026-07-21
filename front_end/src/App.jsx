import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <div className="app-shell">
            <Navbar />
            <main className="app-main">
                <LoginPage />
                <Dashboard />
            </main>
            <Footer />
        </div>
    );
}

export default App;
