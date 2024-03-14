
export const UserInfo = ({ userAdmin, userSaller}) => {
    return (
        <div>
            <h5 className="navbar-brand"> Usuarios administradores: {userAdmin}</h5>
            <h5 className="navbar-brand"> Usuarios ventas: {userSaller}</h5>
        </div>
    )
}
