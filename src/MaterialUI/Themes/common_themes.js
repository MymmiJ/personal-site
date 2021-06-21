import { createMuiTheme } from '@material-ui/core/styles';

const dark_theme = createMuiTheme({
    typography: {
        fontFamily: 'Monospace',
        lineHeight: '100%'
    },
    palette: {
        type: "dark",
        primary: {
        main: '#EF4646',
        },
        secondary: {
        main: '#A2A2EF',
        },
        background: {
        default: "#303030"
        },
    },
});

const light_theme = createMuiTheme({
typography: {
    fontFamily: 'Monospace',
    lineHeight: '100%'
},
palette: {
    type: "light",
    primary: {
    main: '#FF0000',
    },
    secondary: {
    main: '#4646EF',
    },
    background: {
    default: "#DFDFDF"
    },
},
});

export { light_theme, dark_theme };