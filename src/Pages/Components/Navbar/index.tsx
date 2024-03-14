import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <NavLink className={'navbar-brand'} to="/">Biblioteca</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className='nav-item'> <NavLink className={'nav-link'} to="/users">User</NavLink> </li>
                        <li className='nav-item'> <NavLink className={'nav-link'} to="/">Home</NavLink> </li>
                        <li className='nav-item'> <NavLink className={'nav-link'} to="/books">Books</NavLink> </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
