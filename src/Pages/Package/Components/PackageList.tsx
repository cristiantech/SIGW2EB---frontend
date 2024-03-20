
import './index.css'
export const PackageList = ({ data, onDelete, onUpdate }) => {


  return (
    
    <li className="list-group-item li">
      <div>
        <p className="ms-2">{data.title} </p>
        <br /> 
        <p className="ms-5">{data.trackingNumber}</p>
        <p className="ms-5">{data.source} - {data.address} </p>
        <p className="ms-5">{data.state} </p>
        
        
      </div>
      <div>
        <button
          className='btn btn-warning btn-sm float-end mx-2'
          onClick={onUpdate}
        >Editar
        </button>
        <button
          className='btn btn-danger btn-sm float-end'
          onClick={onDelete}
        >Eliminar</button>
      </div>
    </li>
  )
}
