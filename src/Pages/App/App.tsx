
import { BrowserRouter, useRoutes } from 'react-router-dom'

import {Users} from '../Users/index';
import { Home } from '../Home/Index';
import { Books } from '../Books/index';
import './App.css'
import { Navbar } from '../Components/Navbar';

const Approutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home />, },
    { path: '/books', element: <Books />, },
    { path: '/users', element: <Users />, },
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
