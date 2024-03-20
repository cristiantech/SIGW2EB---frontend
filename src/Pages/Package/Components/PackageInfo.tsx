
export const PackageInfo = ({ packageTotalOk, packageTotalTravel }) => {
    return (
        <div>
            <h5 className="navbar-brand"> Total de paquetes entregados: {packageTotalOk}</h5>
            <h5 className="navbar-brand"> Total de paquetes en transporte: {packageTotalTravel}</h5>
        </div>
    )
}
