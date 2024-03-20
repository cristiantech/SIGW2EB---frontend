
import { BrowserRouter, useRoutes } from 'react-router-dom'

import {Users} from '../Users/index';
import { Home } from '../Home/Index';
import { Drivers } from '../Drivers/index';
import { PackagesTras } from '../Package/index';
import './App.css'
import { Navbar } from '../Components/Navbar';

const Approutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home />, },
    { path: '/package', element: <PackagesTras />, },
    { path: '/users', element: <Users />, },
    { path: '/drivers', element: <Drivers />, },
  ])
  return routes;
}
const App = () => {

  return (
    <BrowserRouter>
      <Navbar/>
      <Approutes />
    </BrowserRouter>

  )
}

export default App
