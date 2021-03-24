import { createMuiTheme } from '@material-ui/core/styles';
import {useMediaQuery} from "@material-ui/core";

// const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

export const theme = createMuiTheme({
	palette: {
		type:'dark',
		primary: {
			main: '#0593EA',
		},
		secondary: {
			main: '#E81123',
		},
	},
	typography: {
		fontFamily: [
			'"Rubik"',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		fontSize: 12,
		h1: {
			fontWeight: 600,
			letterSpacing: 1.4,
			'@media (min-width:540px)': {
				fontSize: 35,
			},
		},
		h2: {
			fontWeight: 600,
			letterSpacing: 1.4,
		},
		h3: {
			// fontWeight: 600,
			letterSpacing: 1.4,
		},
		h4: {
			fontWeight: 600,
		},
		h5: {
			fontWeight: 600,
		},
		h6: {
			fontWeight: 600,
		},
		body1:{
			fontSize:14,
			lineHeight: 2,
		}
	},
	shape: {
		borderRadius: 2,
	},
	spacing: 10,
	// Override Styling (CSS Properties)
	overrides: {
		MuiButton: {
			root: {
				// textTransform: 'none',
				borderWidth: '2px',
				// borderRadius: '25px',
				fontSize: 12,
				// fontWeight:500,
			},
			fullWidth: {
				maxWidth: '400px',
			},
			text:{
				fontSize: '12px',
				fontWeight: 600,
			}
		},
	},
	// Defaults Mui Props
	props: {
		MuiButton: {
			// disableElevation: true,
			size: 'small',
		},
		MuiTextField: {
			variant: 'outlined',
			size: 'small',
			margin: 'dense',
		},
		MuiFormControl: {
			size: 'small',
			margin: 'dense',
		},
		MuiPaper:{
			component: 'div',
			square: true,
		}
		// MuiPaper
		// MuiCard
	},
});
