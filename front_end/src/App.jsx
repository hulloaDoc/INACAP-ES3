import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <div className="app-shell">
            <Navbar />
            <main className="app-main">
                <LoginPage />
            </main>
            <Footer />
        </div>
    );
}

export default App;
