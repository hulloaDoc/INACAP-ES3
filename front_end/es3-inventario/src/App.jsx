import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import InventoryPage from './pages/InventoryPage'
import ProtectdRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <ProtectdRoute>
          <InventoryPage />
        </ProtectdRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    
  )
}

export default App;
