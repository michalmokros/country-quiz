import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#9c27b0',
			light: '#6d1b7b',
			dark: '#af52bf',
			contrastText: '#000'
		},
		secondary: {
			main: '#ff9100',
			light: '#b26500',
			dark: '#ffa733',
			contrastText: '#fff'
		}
	}
});

export default theme;
