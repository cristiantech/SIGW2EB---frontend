
import './index.css'
export const DriverList = ({ data, onDelete, onUpdate }) => {



  return (
    
    <li className="list-group-item li">
      <div>
        <p className="ms-2">{data.name}</p>
        <p className="ms-5">{data.mail}</p>
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
