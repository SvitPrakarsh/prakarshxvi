import 'fontsource-poppins';
import '../styles/global.scss';
import Axios from 'axios';
import Layout from '../helpers/Layout';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../helpers/theme';
import { CssBaseline } from '@material-ui/core';
import { Provider } from '../Context';
import Navigation from '../components/Navigation';

const App = ({ Component, pageProps }) => {
	return (
		<Provider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Navigation />
				{/* <Layout> */}
				<Component {...pageProps} />
				{/* </Layout> */}
			</ThemeProvider>
		</Provider>
	);
};

export default App;
