import { Switch } from "@material-ui/core";
import { Brightness3, Brightness7 } from '@material-ui/icons';
import { Grid, Typography } from "@material-ui/core";

const BrightnessSwitch = ({ checked, handleChange }) => <Typography component="div">
    <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item><Brightness3/></Grid>
        <Grid item>
            <Switch checked={ checked } onChange={ handleChange } aria-label="Enable Or Disable Dark Mode" title="Enable Or Disable Dark Mode"/>
        </Grid>
        <Grid item><Brightness7/></Grid>
    </Grid>
</Typography>;

export default BrightnessSwitch;