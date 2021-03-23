import 'fontsource-poppins';
import '../styles/global.scss';
import Axios from 'axios';
import Layout from '../helpers/Layout';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, useMediaQuery } from '@material-ui/core';
import { Provider } from '../Context';
import Navigation from '../components/Navigation';
import Register from '../components/Register';
import { useMemo } from 'react';
import { theme } from '../helpers/theme';

const App = ({ Component, pageProps }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const outerTheme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode]
	);

	return (
		<Provider>
			<ThemeProvider theme={outerTheme}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Navigation />
					<Register />
					{/* <Layout> */}
					<Component {...pageProps} />
					{/* </Layout> */}
				</ThemeProvider>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
