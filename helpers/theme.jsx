import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
	pallete: {
		type: 'dark',
		primary: {
			main: '#0593EA',
		},
		secondary: {
			main: '#E81123',
		},
	},
	typography: {
		fontFamily: [
			'"Poppins"',
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
		},
		h2: {
			fontWeight: 600,
			letterSpacing: 1.4,
		},
		h3: {
			fontWeight: 600,
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
	},
	shape: {
		borderRadius: 10,
	},
	spacing: 10,
	// Override Styling (CSS Properties)
	overrides: {
		MuiButton: {
			root: {
				textTransform: 'none',
				borderWidth: '2px',
				// borderRadius: '25px',
				fontSize: 12,
			},
			fullWidth: {
				maxWidth: '300px',
			},
		},
	},
	// Defaults Mui Props
	props: {
		MuiButton: {
			disableElevation: true,
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
		// MuiPaper
		// MuiCard
	},
});
