import { Outlet } from 'react-router-dom'
import { useState } from 'react';
import Sidebar from './Components/Sidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { getThemePallete } from './Theming/ThemePalette';
import { Grid } from '@mui/material'



function App() {

  const mode  = 'light';
  const [chat, setChat] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)


 

  return (
      <ThemeProvider theme={createTheme(getThemePallete(mode))}>

        <Grid container sx={{ background: 'linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))' }} >
          <Grid
            item xs={12}
            md={2.5}
            sx={{
              bgcolor: 'primary.light',
              '@media (max-width:800px)': {
                width: '70%',
                transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 400ms ease',
              },
            }}
            position={{ xs: 'fixed', md: 'relative' }}
            height={'100vh'}
            zIndex={{ xs: 9999, md: 1 }}
            boxShadow={{ xs: menuOpen ? 10 : 0, md: 0 }}
          >
            <Sidebar setChat={setChat} closeMenu={() => setMenuOpen(false)} />
          </Grid>
          <Grid item xs={12} md={9.5}>
          <Outlet context={{ chat, setChat, handleMobileMenu: setMenuOpen }} />
          </Grid>
        </Grid>

      </ThemeProvider>
  );
}

export default App;