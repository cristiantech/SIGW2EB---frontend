import { useEffect } from 'react'
import './index.css'
export const UserList = ({ data }) => {

  
  useEffect(() => {
    
  })
  
  const deleteUser = async (idClient) =>  {
    try {
      await fetch(`http://localhost:3000/users/${idClient}`,
      { method : "DELETE"})
    } catch (error) {
      console.log(error)
    }
    
  }

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

        >Editar</button>
        <button 
        className='btn btn-warning btn-sm float-end'
        onClick={() => deleteUser(data.idClient)}
        >Eliminar</button>
      </div>
    </li>
  )
}
