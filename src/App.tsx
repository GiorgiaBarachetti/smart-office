import * as React from 'react';
import AppRoutes from './utils/routes/appRoutes';

const App = () => {
  return (
    <AppRoutes />
  );
}

export default App
/*
probabilmente va nel main

  const [darkMode, setDarkMode] = useState(false)

  const theme = createTheme({
    palette: {
        mode: darkMode ? 'dark' : 'light',
    },
  });


<ThemeProvider theme={theme}>
  <Paper>
      <Button onClick={()=>setDarkMode(!darkMode)}></Button>

</Paper>
    </ThemeProvider>
  
    

*/