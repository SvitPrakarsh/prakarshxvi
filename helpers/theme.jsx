import { amber, blue, blueGrey, grey, yellow } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: { main: amber['A200'], contrastText: grey[900] },
		secondary: { main: blue[900], contrastText: 'white' },
		text: {
			primary: grey[900],
		},
	},
	typography: {
		body1: {
			color: blueGrey[800],
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
	},
});

theme.props = {
	MuiButton: {
		disableElevation: true,
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
};

export default theme;
