import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
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

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };



  const container = window !== undefined ? () => window().document.body : undefined;

  console.debug("NAV AUTH: ", authenticated)

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
                <Button key='Home' sx={{ color: '#fff' }}>
                  <NavLink exact to="/">Home</NavLink>
                </Button>
                <Button key='About' sx={{ color: '#fff' }}>
                  <NavLink to="/about">Sobre</NavLink>
                </Button>
                <Button key='SignIn' sx={{ color: '#fff' }}>
                  <NavLink to="/signin">Login</NavLink>
                </Button>
              </>
            ) : (
              <>
                <Button key='Home' sx={{ color: '#fff' }}>
                  <NavLink exact to="/">Home</NavLink>
                </Button>
                <Button key='About' sx={{ color: '#fff' }}>
                  <NavLink to="/about">Sobre</NavLink>
                </Button>
                <Button key='Books' sx={{ color: '#fff' }}>
                <NavLink to="/books">Livros</NavLink>
              </Button>
                <Button key='Profile' sx={{ color: '#fff' }}>
                  <NavLink to="/profile">Perfil</NavLink>
                </Button>
                <Button key='Logout' onClick={()=>handleLogout()} sx={{ color: '#fff' }}>
                  <NavLink to="/login">Logout</NavLink>
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


