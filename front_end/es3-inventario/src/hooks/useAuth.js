import { useContext } from "react";
import { AuthContext } from '../context/authContext';

// hook personalizado para no tner que escribir useContext(AuthContext) 
// en cada componente que necesite saber si el usuario esta logeado o no.
export default function useAuth() {
    // se obtien el valor que esta guardando el AuthContext
    //(normalmente algo como {usuario, login, logout})
    const context = useContext(AuthContext);
    // si el contexto es null, significa que el componente que esta usando este hook no esta dentro del AuthProvider
    // por lo que se lanza un error para visualizar que el hook no se puede usar fuera del AuthProvider y no tener bugs complejos más adelante.    
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    // devuelve el contexto para que el componente pueda usarlo
    // por ejemplo: const {usuario, login, logout} = useAuth();
    return context;
}
