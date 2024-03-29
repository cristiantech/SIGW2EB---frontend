import { useEffect, useState } from 'react'

import { Layout } from '../Components/Layout/index'
import { UserList } from './Components/UserList'
import { UserInfo } from './Components/userInfo';
import { Usersearch } from './Components/Usersearch';


export const Users = () => {
  const [users, setUsers] = useState([]);
  const [usersSearch, setUsersSearch] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [nameUser, setNameUser] = useState('');
  const [emailUser, setEmailUser] = useState('');

  // Obtener los datos de los usuarios al cargar la pagina.
  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json()
        setUsers(data);
      } catch (error) {
        alert(`error servidor no cenectado: ${error}`)
      }
    }
    fetcData();
  }, [])


  // Buscar Clientes
  const searchUser = users.filter(user => {
    return user.name.toLowerCase().includes(usersSearch)
  })

  // Contar los usurio existentes
  const userTotal = searchUser.length;

  // Agregar usurios
  const handleAddUser = async (e) => {
    e.preventDefault();
   
    const data = Object.fromEntries(new FormData(e.target))
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const res = await response.json()
      if (res.statusCode === 409) {
        alert("Usuarioya existe")
      } else {
        alert("Usuario creado")
        window.location.reload();
      }
    } catch (error) {
      alert(`error servidor no cenectado: ${error}`)
    }
  }

  const onDelete = async (id) => {
    alert("Esta seguro de que quire elimar")
    try {
      await fetch(`http://localhost:3000/users/${id}`,
        { method: "DELETE" })
      window.location.reload();
    } catch (error) {
      console.log(error)
    }

  }

  // Actulizar usuarios
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const change = Object.fromEntries(new FormData(e.target))
      const res = await fetch(`http://localhost:3000/users/${idUserForm}`,
        {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(change)
        });

      if (res.status === 200) {
        alert("Datos Actulizados")
        setNameUser("")
        setEmailUser("")
        window.location.reload();
      }else{
        alert("Datos no Actulizados")
      }
      console.log(res)

    } catch (error) {
      console.log(error)
    }

  }

  //Edit Usuarios
  const editUser = async (user) => {
    setEditMode(true);
    setIdUser(user.id);
    setNameUser(user.name)
    setEmailUser(user.mail)
  }

  return (
    <Layout>
      <div>
        <h1 className='navbar-brand'>Usuarios</h1>
        <hr />
        <div className='row'>
          <div className="col-sm-12 col-md-12 col-lg-7">
            <h4 className="navbar-brand"> Lista de Usuarios </h4>
            <UserInfo
              userTotal={userTotal}
            />
            <Usersearch
              usersSearch={usersSearch}
              setUsersSearch={setUsersSearch}
            />
            <ul>
              <hr />
              {
                (searchUser.length <= 0) ? <h5>No hay datos</h5>
                  : searchUser?.map((user) => (
                    <UserList
                      key={user.idUser}
                      data={user}
                      onDelete={() => onDelete(user.id)}
                      onUpdate={() => editUser(user)}
                    />
                  )
                  )
              }
              <hr />
            </ul>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-5">
            <h4 className="navbar-brand"> Formulario {editMode ? "para Modificar" : "para Agregar"} </h4>
            <form onSubmit={editMode ? handleUpdate : handleAddUser}>
              <div className="mb-1">
                <label className="form-label">Nombres Completos</label>
                <input required type="text" className="form-control" id="name" name='name'
                  defaultValue={editMode ? nameUser : ""}></input>
              </div>
              <div className="mb-1">
                <label className="form-label">Email</label>
                <input required type="email" className="form-control" id="mail" name='mail'
                  defaultValue={editMode ? emailUser : ""}></input>
              </div>

              {/* <div className="mb-2">
                <label className="form-label">Role</label>
                <select id="role" className="form-select" name='role'>
                  <option>Adminstrador</option>
                  <option>ventas</option>
                </select>
              </div> */}
              <button type="submit" className={editMode ? "btn btn-primary" : "btn btn-secondary"}>{editMode ? "Modificar" : "Adicionar"}</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>

  )
}
