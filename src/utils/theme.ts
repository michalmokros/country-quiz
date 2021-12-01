import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#ef66ff',
			light: '#6d1b7b',
			dark: '#ef66ff',
			contrastText: '#000'
		},
		secondary: {
			main: '#ff9100',
			light: '#b26500',
			dark: '#ffa733',
			contrastText: '#fff'
		},
		mode: 'dark'
	}
});

export default theme;
