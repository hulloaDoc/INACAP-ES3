function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-light border-top py-3 mt-auto">
            <div className="container-fluid text-center text-muted small">
                <span>{`© ${year} Mi Aplicación`}</span>
                <span className="mx-2">•</span>
                <span>Evaluación ES3 - React + Vite</span>
            </div>
        </footer>
    );
}

export default Footer;
