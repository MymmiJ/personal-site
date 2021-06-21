import { useState } from 'react';
import DefinitionList from './Lists/DefinitionList';
import { ThemeProvider } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { light_theme, dark_theme } from './MaterialUI/Themes/common_themes';
import { CssBaseline, Grid } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import BrightnessSwitch from './Switches/BrightnessSwitch';

function App() {
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
  const [lightTheme, setLightTheme] = useState(prefersLightMode);
  const theme = lightTheme ? light_theme : dark_theme;
  const switchTheme = () => setLightTheme(current => !current);
  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline/>
      <header>
        <Grid container alignItems="center" alignContent="center" justify="space-between">
          <Grid item><h1>Projects By MymmiJ</h1></Grid>
          <Grid item><BrightnessSwitch checked={ lightTheme } handleChange={ switchTheme } /></Grid>
        </Grid>
      </header>
      <DefinitionList header="Novelties" entries={["Antethesizer", "Maze Visualisations", "Reaction Diffusion Algorithm"]}/>
      <DefinitionList header="Game Jam Entries" entries={[
        <Link href="https://mymmij.itch.io/mycorhizal">Mycorhizhal</Link>,
        <Link href="https://mymmij.itch.io/oddbal">Oddbal</Link>
      ]}/>
       <DefinitionList header="Niche Tools" entries={[
        <Link href="https://github.com/MymmiJ/arango-rbac-php">PHP5 ArangoDB RBAC library</Link>
      ]}/>
      <DefinitionList header="Older Projects (Pre-2014)" entries={[
        "Four-button writing in English",
        "Unfinished pixel-art navigation",
        "Simple 'Clawrite' Example",
        "Flash Game 'Hard Beans'"
      ]}/>
      <DefinitionList header="Languages Used Professionally/Extensively" entries={[
        "JavaScript",
        "C#",
        "PHP",
        "Python",
        "Racket",
        "Go",
        "AQL - Arango Query Language",
        "SQL",
        "ActionScript 2.0"
      ]}/>
      <DefinitionList header="Frameworks Used Professionally/Extensively" entries={[
        "React",
        "Sklearn",
        "Symfony",
        "Tensorflow",
        "Calmm"
      ]}/>
    </ThemeProvider>
  );
}

export default App;
