import { useEffect, useState } from 'react'

import { Layout } from '../Components/Layout/index'
import { DriverList } from './Components/DriverList'
import { DriverInfo } from './Components/DriverInfo';
import { DriverSearch } from './Components/DriverSearch';


export const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [driverSearch, setDriverSearch] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [nameDriver, setNameDriver] = useState('');
  const [idDriver, setIdDriver] = useState('');
 

  // Obtener los datos de los usuarios al cargar la pagina.
  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await fetch('http://localhost:3000/drivers');
        const data = await response.json()
        setDrivers(data);
      } catch (error) {
        alert(`error servidor no cenectado: ${error}`)
      }
    }
    fetcData();
  }, [])


  // Buscar Clientes
  const searchDrivers = drivers.filter(drive => {
    return drive.name.toLowerCase().includes(driverSearch)
  })

  // Contar los usurio existentes
  const driverTotal = searchDrivers.length;

  // Agregar usurios
  const handleAddUser = async (e) => {
    e.preventDefault();
   
    const data = Object.fromEntries(new FormData(e.target))
    try {
      const response = await fetch('http://localhost:3000/drivers', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const res = await response.json()
      if (res.statusCode === 409) {
        alert("Conductor existe")
      } else {
        alert("Conductor creado")
        window.location.reload();
      }
    } catch (error) {
      alert(`error servidor no cenectado: ${error}`)
    }
  }

  const onDelete = async (id) => {
    alert("Esta seguro de que quire elimar")
    try {
      await fetch(`http://localhost:3000/drivers/${id}`,
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
      const res = await fetch(`http://localhost:3000/drivers/${idDriver}`,
        {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(change)
        });
      if (res.status === 200) {
        alert("Datos Actulizados")
        setNameDriver('')
        setIdDriver('')
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
  const editUser = async (driver) => {
    if(!editMode){
      setIdDriver(driver.id);
      setEditMode(true);
      setNameDriver(driver.name)
    }else{
      setEditMode(false)
    }
  
  
  }

  return (
    <Layout>
      <div>
        <h1 className='navbar-brand'>Conductores</h1>
        <hr />
        <div className='row'>
          <div className="col-sm-12 col-md-12 col-lg-7">
            <h4 className="navbar-brand"> Lista de Conductores </h4>
            <DriverInfo
              driverTotal={driverTotal}
            />
            <DriverSearch
              driverSearch={driverSearch}
              setDriverSearch={setDriverSearch}
            />
            <ul>
              <hr />
              {
                (searchDrivers.length <= 0) ? <h5>No hay datos</h5>
                  : searchDrivers?.map((driver) => (
                    <DriverList
                      key={driver.id}
                      data={driver}
                      onDelete={() => onDelete(driver.id)}
                      onUpdate={() => editUser(driver)}
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
                  defaultValue={editMode ? nameDriver : ""}></input>
              </div>
              {/* <div className="mb-1">
                <label className="form-label">Email</label>
                <input required type="email" className="form-control" id="mail" name='mail'
                  defaultValue={editMode ? emailUser : ""}></input>
              </div> */}

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
