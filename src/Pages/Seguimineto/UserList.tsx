
import { MapView } from './MapView'
import './index.css'
export const UserList = ({ data }) => {



  return (
    
    <li className="list-group-item li">
      <div>
        {
          data.map(se => (
            <MapView key={se.id} data={se} />
          ))
        }
      </div>
      <div>
     
  
      </div>
    </li>
  )
}
