import './App.css'
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './authentication/requireAuth';
import Login from './authentication/login'
import Layout from './pages/layout';
import Unauthorized from './pages/unauthorized';
import Portal from './pages/portal'
import Settings from './loyalty/settings';
import Home from './pages/home';
import Missing from './pages/missing';
import Admin from './pages/admin';
import Bingo from './pages/bingo'
import PhotoUpload from './bingo/PhotoUpload';
import Loyalty from './loyalty/Loyalty';


function App() {


  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/unauthorized' element={<Unauthorized/>}/>

        <Route element={<RequireAuth allowedRoles={[2001, 3001, 4001, 5001]}/>}>
          <Route path='/home' element={<Home/>}/>
        </Route>
      

        <Route element={<RequireAuth allowedRoles={[2001, 3001, 4001, 5001]}/>}>
          <Route path='/loyalty' element={<Loyalty/>}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={[2001, 3001]}/>}>
          <Route path='/loyalty/settings' element={<Settings/>}/> 
        </Route>

        <Route element={<RequireAuth allowedRoles={[2001]}/>}>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/pedalpusher' element={<Bingo/>}/>
        </Route>

        <Route path='*' element={<Missing/>}/>

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