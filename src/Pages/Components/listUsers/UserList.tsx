
import './index.css'
export const UserList = ({ data, onDelete, onUpdate }) => {



  return (
    
    <li className="list-group-item li">
      <div>
        <p className="ms-2">{data.name} {data.lastname}</p>
        <p className="ms-2">{data.email}</p>
        <p className="ms-2">{data.role}</p>
      </div>
      <div>
        <button
          className='btn btn-danger btn-sm float-end mx-2'
          onClick={onUpdate}
        >Editar
        </button>
        <button
          className='btn btn-warning btn-sm float-end'
          onClick={onDelete}
        >Eliminar</button>
      </div>
    </li>
  )
}
