import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <NavLink className={'navbar-brand'} to="/">Swifcofe - Entrega de Paqueteria</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className='nav-item'> <NavLink className={'nav-link'} to="/users">Usuarios</NavLink> </li>
                        <li className='nav-item'> <NavLink className={'nav-link'} to="/package">Registro de Paquetes</NavLink> </li>
                        <li className='nav-item'> <NavLink className={'nav-link'} to="/drivers">Conductores</NavLink> </li>
                        <li className='nav-item'> <NavLink className={'nav-link'} to="/tracking">Seguimiento de paquetes - Clientes</NavLink> </li>
                        <li className='nav-item'> <NavLink className={'nav-link'} to="/history">Historial de envios - Clientes</NavLink> </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
