import { amber, blue, blueGrey, grey, yellow } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const innerTheme = createMuiTheme({
	palette:
		{
			primary: { main: '#FF0050',  },
			secondary: { main: '#24ECE7', },
			text: {
				// primary: '#fafafa',
			},

	typography: {
		body2: {
			color: grey[400],
		},
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
	}}}
);

innerTheme.props = {
	MuiButton: {
		disableElevation: true,
		borderRadius: '25px',
		borderWidth: '2px',
		variant: 'dense'
	},
	MuiInput: {
		color: 'secondary',
	},
	MuiInputLabel: {
		color: 'secondary',
	},
	MuiTextField: {
		variant: 'outlined',
		size: 'small',
		color: 'secondary',
		margin: 'dense',
	},
	MuiFormControl:{
		size: 'small',
		margin:"dense"
	}
};

export default innerTheme;
