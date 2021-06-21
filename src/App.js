import { useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { light_theme, dark_theme } from './MaterialUI/Themes/common_themes';
import { CssBaseline, Grid } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BrightnessSwitch from './Switches/BrightnessSwitch';
import Home from './Home';
import Clawrite from './Clawrite';
import FourButtonEnglishText from './FourButtonEnglishText';

function App() {
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
  const [lightTheme, setLightTheme] = useState(prefersLightMode);
  const theme = lightTheme ? light_theme : dark_theme;
  const switchTheme = () => setLightTheme(current => !current);
  return (
    <Router>
      <ThemeProvider theme={ theme }>
        <CssBaseline/>
        <header>
          <Grid container alignItems="center" alignContent="center" justify="space-around" spacing={0}>
            <Grid item><Link href="/"><h1>Projects By MymmiJ</h1></Link></Grid>
            <Grid item><BrightnessSwitch checked={ lightTheme } handleChange={ switchTheme } /></Grid>
          </Grid>
        </header>
        <Switch>
          <Route path="/Old/FourButton">
            <FourButtonEnglishText/>
          </Route>
          <Route path="/Old/Clawrite">
            <Clawrite/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
