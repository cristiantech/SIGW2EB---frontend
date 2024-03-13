
import { useEffect, useState } from 'react';
import './App.css'
import { UserList } from './components/listUsers/UserList';



function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json()
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetcData();
  }, [])


  return (
    <>
      <div className='container mt-5'>

        <h1 className='h2'>Usuarios</h1>
        <hr />
        <div className='row'>
          <div className="col-sm-12 col-md-12 col-lg-8">
            <h4 className="h4"> Lista de Usuarios </h4>

           
            <ul>
              <hr />
              {(users.length <= 0) ?
                <h5>No hay datos</h5>
                :
                users?.map((user) => (
                  <UserList key={user.idClient} data={user} />
                ))
              }
              <hr />
            </ul>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-8">

          </div>
        </div>
      </div >
    </>
  )
}

export default App
