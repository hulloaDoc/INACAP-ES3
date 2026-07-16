import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id='container'>
        <div className='header-title'>
          <p>INACAP Market</p>
          <p>Bienvenido, admin(Rol: Coordinador)</p>
          <button className='sesion'>[Cerrar Sesión]</button>
        </div>
        <div className='nav-product'></div>
        <div className='product-list'></div>
        <div className='footer'></div>
      </section>
    </>
  )
}

export default App
