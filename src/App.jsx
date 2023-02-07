import './App.css'
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/requireAuth';
import Login from './components/login'
import Layout from './components/layout';
import Unauthorized from './components/unathorized';
import Portal from './components/portal'
import Settings from './settings';
import Home from './components/home';


function App() {

const ROLES = {
  
}

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='login' element={<Login/>} />
        <Route path='unauthorized' element={<Unauthorized/>}/>

        <Route element={<RequireAuth/>}>
          
      </Route>

      <Route element={<RequireAuth allowedRoles={[2001]}/>}>
        <Route path='portal' element={<Portal/>} />
          {/* <Route path='settings' element={<Settings/>}/>  */}
          {/* <Route />
          <Route />  */}
      </Route>
      </Route>
    </Routes>
  )
}

export default App


  // <div className="App">
    //   <h1>Casual Ride Loyalty Program</h1>
    //   <h2>Local Bike Shop NFK</h2>
    //   <div>
    //     <SearchCustomer/>
    //     <Login/>
    //   </div>
    //             </div>