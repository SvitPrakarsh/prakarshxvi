import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
	pallete: {
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
	},
	shape: {
		borderRadius: 15,
	},
	spacing: 10,
	// Override Styling (CSS Properties)
	overrides: {
		MuiButton: {
			root: {
				textTransform: 'none',
				borderWidth: '2px',
				borderRadius: '25px',
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
