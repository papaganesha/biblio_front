import './Navbar.css'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { AuthContext } from '../Contexts/AuthContext';

import { NavLink } from "react-router-dom";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}


export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { authenticated, handleLogout} = React.useContext(AuthContext)
  const refreshToken = localStorage.getItem('refreshToken')


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  return (
    <Box className="navbar" sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Gerenciador de Biblioteca
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

            {!authenticated ? (
              <>
                <Button key='Home' sx={{width: '130px', backgroundColor: 'white', color: 'black', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', mr: 2}}>
                  <NavLink exact to="/">Home</NavLink>
                </Button>
                <Button key='SignIn' sx={{ width: '130px', backgroundColor: 'white',color: '#fff' , boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', mr:2}}>
                  <NavLink to="/signin">Login</NavLink>
                </Button>
                <Button key='SignUp' sx={{ width: '130px', backgroundColor: 'white',color: '#fff' , boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
                <NavLink to="/signup">Cadastro</NavLink>
              </Button>
              </>
            ) : (
              <>
                <Button key='Home' sx={{ width: '130px',backgroundColor: 'white',color: '#fff' , boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', mr: 2}}>
                  <NavLink exact to="/">Home</NavLink>
                </Button>
                <Button key='Books' sx={{ width: '130px',backgroundColor: 'white',color: '#fff' , boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', mr: 2}}>
                <NavLink to="/books">Livros</NavLink>
              </Button>
                <Button key='Profile' sx={{ width: '130px',backgroundColor: 'white',color: '#fff', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', mr: 2}}>
                  <NavLink to="/profile">Perfil</NavLink>
                </Button>
                <Button key='Logout' onClick={async()=>await handleLogout()} sx={{ width: '130px',backgroundColor: 'white',color: 'black', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
                <NavLink to="">Logout</NavLink>
                  
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


