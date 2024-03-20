import { useEffect, useState } from 'react'
import { Layout } from '../Components/Layout'
import { UserList } from './UserList'

export const History = () => {
    const [dataUser, setDataUser] = useState([])
    const [idSearch, setIdSearch] = useState([])
    const [dataByPackage, setDataByPackage] = useState([])

    useEffect(() => {
        const fetcData = async () => {
            try {
                const response = await fetch('http://localhost:3000/users');
                const data = await response.json()
                setDataUser(data)
            } catch (error) {
                alert(`error servidor no cenectado: ${error}`)
            }
        }
        fetcData();
    }, [])

    function ChangeValor(e){
        setIdSearch(e.target.value);
        getUserByPackage(e.target.value)
    }

    const getUserByPackage = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/users/package/${id}`);
            const data = await response.json()
            setDataByPackage(data)
        } catch (error) {
            console.log(error)
        }
    }

  

    return (
        <Layout>

            <div className="mb-1">
                <label className="form-label">Historial del Cliente envio</label>
                <select id="role" className="form-select" name='userId' onChange={ChangeValor}>
                    {
                        dataUser?.map(us => (
                            <option value={us.id} key={us.id}>{us.name}</option>
                        ))
                    }

                </select>
            </div>
            <div>

                {
                    dataByPackage.map(dt => (
                        <UserList key={dt.id} data={dt.packages} />
                    ))
                }
            </div>

        </Layout>
    )
}
