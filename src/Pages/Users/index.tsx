import { useEffect, useState } from 'react'

import { Layout } from '../Components/Layout/index'
import { UserList } from '../Components/listUsers/UserList'
import { UserInfo } from './userInfo';
import { Usersearch } from './Usersearch';


export const Users = () => {
  const [users, setUsers] = useState([]);
  const [usersSearch, setUsersSearch] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [idUserForm, setIdUser] = useState(0);
  const [nameUser, setNameUser] = useState('');
  const [lastnameUser, setLastnameUser] = useState('');
  const [emailUser, setEmailUser] = useState('');

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

  const handleFormSubmit = async (e) => {
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

  const searchUser = users.filter(user => {
    return user.name.toLowerCase().includes(usersSearch)
  })

  const userAdmin = searchUser.filter((user) => user.role === 'Adminstrador').length;
  const userSaller = searchUser.filter((user) => user.role === 'ventas').length;

  const onDelete = async () => {
    alert("Esta seguro de que quire elimar")
    try {
      await fetch(`http://localhost:3000/users/${idUser}`,
        { method: "DELETE" })
        window.location.reload();
    } catch (error) {
      console.log(error)
    }

  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const change = Object.fromEntries(new FormData(e.target))
      const data = JSON.stringify(change);
      const res = await fetch(`http://localhost:3000/users/${idUserForm}`,
        { 
          method: "PUT",
          headers: { "Content-Type": "application/json"},
          body:  data
       });
       console.log(res)
        // window.location.reload();
        setIdUser(0)
        setNameUser("")
        setEmailUser("")
    } catch (error) {
      console.log(error)
    }

  }

  const editUser = async (user) => {
    setEditMode(true);
    setIdUser(user.idUser);
    setNameUser(user.name)
    setLastnameUser(user.lastname)
    setEmailUser(user.email)
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
              userAdmin={userAdmin}
              userSaller={userSaller}
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
                      onDelete={() => onDelete(user.idUser)}
                      onUpdate={() => editUser(user)}
                    />
                  )
                  )
              }
              <hr />
            </ul>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-5">
            <h4 className="navbar-brand"> Formulario {editMode ? "Modificar" : "Agregar"} </h4>
            <form onSubmit={editMode ? handleUpdate: handleFormSubmit }>
              <div className="mb-1">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" id="name" name='name' 
                defaultValue={editMode ? nameUser : ""}></input>
              </div>
              <div className="mb-1">
                <label className="form-label">Apellido</label>
                <input type="text" className="form-control" id="lastname" name='lastname'
                defaultValue={editMode ? lastnameUser : ""}></input>
              </div>
              <div className="mb-1">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name='email'
                 defaultValue={editMode ? emailUser : ""}></input>
              </div>
              <div className={editMode ? "d-none mb-1": "mb-1"}>
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" name='password'></input>
              </div>
              <div className="mb-2">
                <label className="form-label">Role</label>
                <select id="role" className="form-select" name='role'>
                  <option>Adminstrador</option>
                  <option>ventas</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">{editMode ? "Modificar": "Adicionar"}</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>

  )
}
