import { useEffect, useState } from 'react'

import { Layout } from '../Components/Layout/index'
import { PackageList } from './Components/PackageList'
import { PackageInfo } from './Components/PackageInfo';
import { PackageSearch } from './Components/PackageSearch';



export const PackagesTras = () => {
  const [packages, setPackage] = useState([]);
  const [packageSearch, setPackageSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [titlePackage, setTitlePackage] = useState('');
  const [idUser, setIdUser] = useState('');




  // Obtener los datos de los usuarios al cargar la pagina.
  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await fetch('http://localhost:3000/packages');
        const data = await response.json()
        setPackage(data);
      } catch (error) {
        alert(`error servidor no cenectado: ${error}`)
      }
    }
    fetcData();
  }, [])


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
  const searchPackage = packages.filter(pack => {
    return pack.title.toLowerCase().includes(packageSearch)
  })

  // Contar los usurio existentes
  const packageTotalOk = searchPackage.filter(pa => pa.state.toLowerCase() === 'entregado').length;
  // Contar los paguetes en trasporte
  const packageTotalTravel = searchPackage.filter(pa => pa.state.toLowerCase() === 'trasportando').length;

  const generateTracking = () => {
    return "000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
  }

  // Agregar usurios
  const handleAddPackage = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target))
    const dataConver = JSON.parse(JSON.stringify(data))
    if (dataConver.userId) {
      dataConver.userId = Number(data.userId)
    }
    dataConver.state = "transporte";
    dataConver.trackingNumber = generateTracking()

    const res = await fetch(`http://localhost:3000/packages`,
    {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataConver)
    });

    if (res.status === 201) {
      try {
        const newNotification = {
          userId: 1,
          content: "Se ha creado un nuevo envío.",
          isRead: false
        }
        const resnoti = await fetch('http://localhost:3000/notification', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newNotification)
        });
        console.log(resnoti)
         if(resnoti.status === 200){
          alert("Notificacion enviada")
         }
       } catch (error) {

       }
     }

    // window.location.reload();      

  }



  const onDelete = async (id) => {
    alert("Esta seguro de que quire elimar")
    try {
      await fetch(`http://localhost:3000/package/${id}`,
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
      const res = await fetch(`http://localhost:3000/packages/ubication/${idUser}`,
        {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(change)
        });
      if (res.status === 200) {
        alert("Datos Actulizados")
        try {
          console.log(users)
          const newNotification = {
            userId: 1,
            content: "Se ha creado un nuevo envío.",
            isRead: false
          }
          const res = await fetch('http://localhost:3000/notification', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNotification)
          });
          console.log(res)
        } catch (error) {

        }
        window.location.reload();
      } else {
        alert("Datos no Actulizados")
      }


    } catch (error) {
      console.log(error)
    }

  }

  // Obtener los datos de los usuarios al cargar la pagina.




  //Edit Usuarios
  const editUser = async (pack) => {
    if (!editMode) {
      setIdUser(pack.id)
      setEditMode(true);
      setTitlePackage(pack.title)
    } else {
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
            <PackageInfo
              packageTotalOk={packageTotalOk}
              packageTotalTravel={packageTotalTravel}
            />
            <PackageSearch
              packageSearch={packageSearch}
              setPackageSearch={setPackageSearch}
            />
            <ul>
              <hr />
              {
                (searchPackage.length <= 0) ? <h5>No hay datos</h5>
                  : searchPackage?.map((pack) => (
                    <PackageList
                      key={pack.id}
                      data={pack}
                      onDelete={() => onDelete(pack.id)}
                      onUpdate={() => editUser(pack)}
                    />
                  )
                  )
              }
              <hr />
            </ul>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-5">
            <h4 className="navbar-brand"> Formulario {editMode ? "para Modificar" : "para Agregar"} </h4>
            <form onSubmit={editMode ? handleUpdate : handleAddPackage}>
              <div className="mb-1">
                <label className="form-label">Nombre del paquete</label>
                <input required type="text" className="form-control" id="title" name='title'
                  defaultValue={editMode ? titlePackage : ""}></input>
              </div>
              <div className={editMode ? "d-none" : "mb-1"}>
                <label className="form-label">Ciudad de origin</label>
                <input required type="text" className="form-control" id="source" name='source'
                  defaultValue={editMode ? titlePackage : ""}></input>
              </div>

              <div className={editMode ? "d-none" : "mb-1"}>
                <label className="form-label">Ciudad de destino</label>
                <input required type="text" className="form-control" id="address" name='address'
                  defaultValue={editMode ? titlePackage : ""}
                ></input>
              </div>

              <div className="mb-1">
                <label className="form-label">Latitud</label>
                <input required type="text  " className="form-control" id="latitude" name='latitude'
                ></input>
              </div>

              <div className="mb-1">
                <label className="form-label">Longitud</label>
                <input required type="text" className="form-control" id="longitude" name='longitude'
                ></input>
              </div>

              <div className={editMode ? "d-none" : "mb-1"}>
                <label className="form-label">Cliente</label>
                <select id="role" className="form-select" name='userId'>
                  {
                    users?.map(us => (
                      <option value={us.id} key={us.id}>{us.name}</option>
                    ))
                  }

                </select>
              </div>
              <button type="submit" className={editMode ? "btn btn-primary" : "btn btn-secondary"}>{editMode ? "Modificar" : "Adicionar"}</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>

  )
}


