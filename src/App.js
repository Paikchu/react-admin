import {ColorModeContext, useMode} from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard';
import AdminSidebar from './scenes/global/AdminSidebar';
import {useState} from "react";
import CompanyTable from './scenes/table/company';
import UserTable from './scenes/table/user';
import {Routes, Route} from "react-router-dom";
import GameTable from './scenes/table/game';
import OrderTable from './scenes/table/order';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar] = useState(true);
  return(
  <ColorModeContext.Provider value = {colorMode}>
    <ThemeProvider theme = {theme}>
      <CssBaseline />
      <div className='app'>
        <AdminSidebar/>
        <main className='content'>
          <Topbar/>
          <Routes>
            <Route path = "/table_users" element={<UserTable/>}/>
            <Route path = "/table_companies" element={<CompanyTable/>}/>
            <Route path ='/table_games' element = {<GameTable/>}/>
            <Route path='/table_order' element ={<OrderTable/>}/>
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>);
}

export default App;
