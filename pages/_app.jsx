import { useMemo } from 'react';
import 'fontsource-poppins';
import Axios from 'axios';
import { CssBaseline, useMediaQuery } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { theme } from '../helpers/theme';
import '../styles/global.scss';
// import Layout from '../helpers/Layout';
import { Provider } from '../Context';
import Navigation from '../components/Navigation';
import Register from '../components/Register';

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
			{/* <ThemeProvider theme={outerTheme}> */}
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{/* <Layout> */}
				<Navigation />
				<Register />
				<Component {...pageProps} />
				{/* </Layout> */}
			</ThemeProvider>
			{/* </ThemeProvider> */}
		</Provider>
	);
};

export default App;
