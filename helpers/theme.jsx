import { createMuiTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

// const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

export const theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#0593EA',
		},
		background: {
			default: '#0b0812',
			paper: '#162232',
		},
		secondary: {
			main: '#FF4655',
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
			fontFamily: '"Tungsten", sans-serif',
			fontWeight: 400,
			textTransform: 'uppercase',
			letterSpacing: 2,
		},
		h4: {
			fontWeight: 600,
		},
		h5: {
			fontWeight: 600,
		},
		body1: {
			fontSize: 14,
			lineHeight: 1.5,
		},
	},
	shape: {
		borderRadius: 2.5,
	},
	spacing: 10,
	// Override Styling (CSS Properties)
	overrides: {
		MuiChip: {
			root: {
				boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.25)'
			}
		},
		MuiButton: {
			root: {
				// textTransform: 'none',
				// borderWidth: '2px',
				// borderRadius: '25px',
				fontSize: 12,
				fontWeight: 500,
				margin: '0 10px',
			},
			text: {
				fontSize: '12px',
				// fontWeight: 500,
			},
			outlined: {
				borderWidth: '2px',
			},
		},
		MuiDivider: {
			root: {
				backgroundColor: '#FF4655',
			},
		},
		MuiModal: {
			root: {
				maxWidth: '750px'
			}
		},
		MuiAccordion: {
			root: {
				marginBottom: 15,
				border: '#ff465699 solid 2px',
				padding: 7
			},
			rounded: {
				borderRadius: 10,
			},
			expanded: {}
		}
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
		MuiPaper: {
			component: 'div',
			square: true,
		},
		MuiAccordion: {
			elevation: 5
		}
		// MuiCard
	},
});
